import { RichEmbed } from 'discord.js';

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
            this.sendError('Unexpected number of arguments',
                'Use command with two arguments to specify minimum and maximum values in range or no arguments to use default range (0-100)');
            return false;
        } else if (!args[0].match(/^[0-9]+$/) || !args[1].match(/^[0-9]+$/)) {
            this.sendError('Invalid arguments', 'Arguments must be integers');
            return false;
        } else {
            this.min = +args[0];
            this.max = +args[1];
            if (this.min === this.max) {
                this.sendError('Invalid arguments', 'Minimum and maximum values cannot be equal');
                return false;
            } else if (this.min > this.max) {
                this.sendError('Invalid arguments', 'Minimum value cannot be greater than maximum');
                return false;
            }
        }

        return true;
    };

    execute(): boolean {
        let richEmbed = new RichEmbed()
            .setColor('#15ff55')
            .addField(Math.floor(Math.random() * Math.floor(this.max - this.min + 1)) + this.min, '🎲');
        this.message.channel.send(richEmbed);
        return true;
    }
}
