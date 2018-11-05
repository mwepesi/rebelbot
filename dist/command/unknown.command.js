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
var command_1 = require("./command");
var Unknown = /** @class */ (function (_super) {
    __extends(Unknown, _super);
    function Unknown(bot, message, command) {
        var _this = _super.call(this, bot, message) || this;
        _this.command = command;
        _this.validateArgs = function () { return true; };
        return _this;
    }
    Unknown.prototype.execute = function () {
        this.message.channel.send("I don't know how to " + this.command);
        return false;
    };
    return Unknown;
}(command_1.Command));
exports.Unknown = Unknown;
