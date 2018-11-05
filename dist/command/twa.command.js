"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var discord_js_1 = require("discord.js");
var https_1 = require("https");
var zlib_1 = require("zlib");
var command_1 = require("./command");
var options = {
    hostname: 's3-eu-west-1.amazonaws.com',
    port: 443,
    method: 'GET'
};
var playerIdInfoMessage = "Player's nine-digit wargaming ID is needed. Visit https://eu.wargaming.net/personal/ " +
    "and check the __Access Control__ section for `https://eu.wargaming.net/id/123456789-PlayerName`. Player " +
    "ID is the nine-digit number before the dash and player's name.";
var Twa = /** @class */ (function (_super) {
    __extends(Twa, _super);
    function Twa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Twa.prototype.validateArgs = function (args) {
        if (args.length < 1) {
            this.message.channel.send(playerIdInfoMessage);
            return false;
        }
        // Check that the argument is a number
        if (!/\d/.test(args[0])) {
            this.message.channel.send("Entered player ID, " + args[0] + ", is invalid.");
            this.message.channel.send(playerIdInfoMessage);
            return false;
        }
        this.playerId = args[0];
        return true;
    };
    ;
    Twa.prototype.execute = function () {
        this.fetchOpenId();
        return true;
    };
    Twa.prototype.fetchOpenId = function () {
        var _this = this;
        this.message.channel.send("Fetching open id for player " + this.playerId);
        options.path = "/live-usermap.twaservers.com/wgid/" + this.playerId;
        https_1.get(options, function (resp) {
            var statusCode = resp.statusCode;
            var gunzip = zlib_1.createGunzip();
            var data = '';
            console.log("headers: " + JSON.stringify(resp.headers));
            if (statusCode !== 200) {
                var error = new Error('Request Failed.\n' + ("Status Code: " + statusCode));
                console.error(error.message);
                _this.message.react('👎');
                _this.message.channel.send("Error: " + error.message);
                // consume response data to free up memory
                resp.resume();
                return;
            }
            resp.pipe(gunzip);
            // A chunk of data has been received.
            gunzip.on('data', function (chunk) {
                data += chunk;
                console.log("received new chunk: " + data);
            });
            // The whole response has been received. Print out the result.
            gunzip.on('end', function () {
                console.log("Retrieved player's open id: " + data + ". Fetching data.");
                _this.message.channel.send("Player's open id: " + (data.substr(0, 9) + "****-****-****-************") + ". " +
                    'Fetching profile data.');
                _this.playerOpenId = data;
                _this.fetchTwaProfileData();
            });
        }).on("error", function (err) {
            console.log("Error: " + err.message);
        });
    };
    ;
    Twa.prototype.fetchTwaProfileData = function () {
        var _this = this;
        options.path = "/live-caprofile-profiles.twaservers.com/public/" + this.playerOpenId + ".json";
        https_1.get(options, function (resp) {
            var gunzip = zlib_1.createGunzip();
            var data = '';
            var statusCode = resp.statusCode;
            console.log("headers: " + JSON.stringify(resp.headers));
            if (statusCode !== 200) {
                var error = new Error('Request Failed.\n' + ("Status Code: " + statusCode));
                console.error(error.message);
                _this.message.react('👎');
                _this.message.channel.send("Error: " + error.message);
                // consume response data to free up memory
                resp.resume();
            }
            resp.pipe(gunzip);
            // A chunk of data has been received.
            gunzip.on('data', function (chunk) {
                data += chunk;
            });
            // The whole response has been received. Print out the result.
            gunzip.on('end', function () {
                var jsonResp = JSON.parse(data);
                console.log(jsonResp);
                var userIconUrl = _this.message.author.displayAvatarURL;
                var twaInfoEmbed = new discord_js_1.RichEmbed()
                    .setDescription('TWA Profile Information')
                    .setColor('#55ff45')
                    .setThumbnail(userIconUrl)
                    .addField('Total Kills', jsonResp.totals.kills)
                    .addField('Battles Played', jsonResp.totals.battles_played)
                    .addField('Battles Won', jsonResp.totals.results.victories)
                    .addField('Kill Rate', jsonResp.totals.kills / jsonResp.totals.battles_played)
                    .addField('Win Rate', jsonResp.totals.results.victories / jsonResp.totals.battles_played * 100 + '%');
                _this.message.channel.send(twaInfoEmbed);
            });
        }).on("error", function (err) {
            console.log("Error: " + err.message);
        });
    };
    ;
    return Twa;
}(command_1.Command));
exports.Twa = Twa;
