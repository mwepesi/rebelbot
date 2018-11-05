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
var Pick = /** @class */ (function (_super) {
    __extends(Pick, _super);
    function Pick() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pick.prototype.validateArgs = function (args) {
        if (args.length < 2) {
            this.message.channel.send('Two or more arguments are required');
            return false;
        }
        this.args = args;
        return true;
    };
    ;
    Pick.prototype.execute = function () {
        var index = Math.floor(Math.random() * this.args.length);
        this.message.channel.send(this.args[index]);
        return true;
    };
    return Pick;
}(command_1.Command));
exports.Pick = Pick;
