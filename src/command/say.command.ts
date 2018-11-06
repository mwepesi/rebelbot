import { RichEmbed } from 'discord.js';

import { Command } from './command';

export class Say extends Command {
    args: string[];

    validateArgs(args: string[]) {
        this.args = args;

        return true;
    };

    execute(): boolean {
        let richEmbed = new RichEmbed()
            .setColor('#15ff55')
            .addField(this.args.join(' '), '📣');
        this.message.channel.send(richEmbed);
        return true;
    }
}
