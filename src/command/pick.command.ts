import { RichEmbed } from 'discord.js';

import { Command } from './command';

export class Pick extends Command {
    args: string[];

    validateArgs(args: string[]) {
        if (args.length < 2) {
            this.sendError('Invalid number of arguments', 'Two or more arguments are required');
            return false;
        }

        this.args = args;

        return true;
    };

    execute(): boolean {
        let index = Math.floor(Math.random() * this.args.length);
        let richEmbed = new RichEmbed()
            .setColor('#15ff55')
            .addField(this.args[index], '🎲');
        this.message.channel.send(richEmbed);
        return true;
    }
}
