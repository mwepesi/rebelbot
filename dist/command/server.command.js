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
var command_1 = require("./command");
var Server = /** @class */ (function (_super) {
    __extends(Server, _super);
    function Server() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateArgs = function () { return true; };
        return _this;
    }
    Server.prototype.execute = function () {
        var clanEmbed = new discord_js_1.RichEmbed()
            .setDescription('Server Information')
            .setColor('#35ff25')
            .setThumbnail(this.message.guild.iconURL)
            .addField('Server Name', this.message.guild.name)
            .addField('Total Members', this.message.guild.memberCount);
        this.message.channel.send(clanEmbed);
        return true;
    };
    return Server;
}(command_1.Command));
exports.Server = Server;
