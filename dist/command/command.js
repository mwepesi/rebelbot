"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Command = /** @class */ (function () {
    function Command(bot, message) {
        this.bot = bot;
        this.message = message;
    }
    Command.prototype.run = function (args) {
        if (this.validateArgs(args) && this.execute()) {
            this.message.react('👍');
        }
        else {
            this.message.react('👎');
        }
    };
    return Command;
}());
exports.Command = Command;
