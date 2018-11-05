import { Command } from './command';

export class Random extends Command {
    min: number;
    max: number;

    validateArgs(args: string[]) {
        this.min = 0;
        this.max = 100;
        if (args.length === 0) {
            return true;
        } else if (args.length === 1 || args.length > 2) {
            this.message.channel.send('Unexpected number of arguments; use command with two arguments to specify' +
                ' minimum and maximum values in range or no arguments to use default range (0-100)');
            return false;
        } else if (!/\d/.test(args[0]) || !/\d/.test(args[1])) {
            this.message.channel.send('Arguments must be numeric');
            return false;
        } else {
            this.min = +args[0];
            this.max = +args[1];
            if (this.min === this.max) {
                this.message.channel.send('Minimum and maximum values cannot be equal');
                return false;
            } else if (this.min > this.max) {
                this.message.channel.send('Minimum value cannot be greater than maximum');
                return false;
            }
        }

        return true;
    };

    execute(): boolean {
        this.message.channel.send(Math.floor(Math.random() * Math.floor(this.max - this.min + 1)) + this.min);
        return true;
    }

}