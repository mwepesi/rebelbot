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
var ONE_HOUR_MILLIS = 60 * 60 * 1000;
var Timer = /** @class */ (function (_super) {
    __extends(Timer, _super);
    function Timer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timer.prototype.validateArgs = function (args) {
        if (args.length === 0) {
            this.message.channel.send('Timer value is required');
            return false;
        }
        else if (args.length > 1) {
            this.message.channel.send('Unexpected number of arguments; use command with one argument to specify' +
                ' the number of seconds to count down from');
            return false;
        }
        else if (!/\d/.test(args[0])) {
            this.message.channel.send('Argument must be numeric');
            return false;
        }
        else {
            this.millis = +args[0] * 1000;
            if (this.millis > 2 * ONE_HOUR_MILLIS) {
                this.message.channel.send('Timer value cannot exceed 2 hours');
                return false;
            }
        }
        return true;
    };
    ;
    Timer.prototype.execute = function () {
        var _this = this;
        this.countdownTime = new Date().getTime() + this.millis;
        this.interval = setInterval(function () {
            // Get todays date and time
            var now = new Date().getTime();
            // Find the distance between now and the count down date
            var distance = Math.floor((_this.countdownTime - now) / 1000);
            if (distance === 3600) {
                _this.message.channel.send('One hour remaining');
            }
            else if (distance === 600) {
                _this.message.channel.send('Ten minutes remaining');
            }
            else if (distance === 120) {
                _this.message.channel.send('Two minutes remaining');
            }
            else if (distance === 60) {
                _this.message.channel.send('One minute remaining');
            }
            else if (distance === 30) {
                _this.message.channel.send('Thirty seconds remaining');
            }
            else if (distance === 10) {
                _this.message.channel.send('Ten seconds remaining');
            }
            // If the count down is finished, write some text 
            if (distance <= 0) {
                clearInterval(_this.interval);
                _this.message.channel.send('Timer has expired');
            }
        }, 1000);
        return true;
    };
    return Timer;
}(command_1.Command));
exports.Timer = Timer;
