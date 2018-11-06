import { RichEmbed } from "discord.js";

import { Command } from './command';

export class Server extends Command {

    validateArgs = () => true;

    execute() {
        let clanEmbed = new RichEmbed()
            .setDescription('Server Information')
            .setColor('#35ff25')
            .setThumbnail(this.message.guild.iconURL)
            .addField('Server Name', this.message.guild.name)
            .addField('Total Members', this.message.guild.memberCount);
        this.message.channel.send(clanEmbed);
        return true;
    }
}
