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
var pkg = require('../../package.json');
var Bot = /** @class */ (function (_super) {
    __extends(Bot, _super);
    function Bot() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.validateArgs = function () { return true; };
        return _this;
    }
    Bot.prototype.execute = function () {
        var infoEmbed = new discord_js_1.RichEmbed()
            .setDescription('Bot Information')
            .setColor('#15ff55')
            .setThumbnail(this.bot.user.displayAvatarURL)
            .addField('Bot Name', this.bot.user.username)
            .addField('Author', 'Mwepesi / The Rebel Alliance')
            .addField('Version', pkg.version);
        this.message.channel.send(infoEmbed);
        return true;
    };
    return Bot;
}(command_1.Command));
exports.Bot = Bot;
