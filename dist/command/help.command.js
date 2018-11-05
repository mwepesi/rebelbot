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
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateArgs = function () { return true; };
        return _this;
    }
    Help.prototype.execute = function () {
        var helpEmbed = new discord_js_1.RichEmbed()
            .setDescription('Bot Commands')
            .setColor('#15ff55')
            .setThumbnail(this.bot.user.displayAvatarURL)
            .addField('server', 'display discord server information')
            .addField('bot', 'display bot information')
            .addField('timer', 'countdown given amount of seconds - requires one numeric argument')
            .addField('random', 'display a random number - optionally, takes lower and upper range as arguments (defaults: 0, 100)')
            .addField('pick', 'randomly pick one of given arguments -requires two or more arguments')
            .addField('twa', 'display TWA player statistics - requires player ID as argument')
            .addField('say', 'echo given arguments');
        this.message.channel.send(helpEmbed);
        return true;
    };
    return Help;
}(command_1.Command));
exports.Help = Help;
