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
var Random = /** @class */ (function (_super) {
    __extends(Random, _super);
    function Random() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Random.prototype.validateArgs = function (args) {
        this.min = 0;
        this.max = 100;
        if (args.length === 0) {
            return true;
        }
        else if (args.length === 1 || args.length > 2) {
            this.message.channel.send('Unexpected number of arguments; use command with two arguments to specify' +
                ' minimum and maximum values in range or no arguments to use default range (0-100)');
            return false;
        }
        else if (!/\d/.test(args[0]) || !/\d/.test(args[1])) {
            this.message.channel.send('Arguments must be numeric');
            return false;
        }
        else {
            this.min = +args[0];
            this.max = +args[1];
            if (this.min === this.max) {
                this.message.channel.send('Minimum and maximum values cannot be equal');
                return false;
            }
            else if (this.min > this.max) {
                this.message.channel.send('Minimum value cannot be greater than maximum');
                return false;
            }
        }
        return true;
    };
    ;
    Random.prototype.execute = function () {
        this.message.channel.send(Math.floor(Math.random() * Math.floor(this.max - this.min + 1)) + this.min);
        return true;
    };
    return Random;
}(command_1.Command));
exports.Random = Random;
