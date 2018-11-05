import { RichEmbed } from "discord.js";

import { Command } from './command';

export class Help extends Command {

    validateArgs = () => true;

    execute(): boolean {
        let helpEmbed = new RichEmbed()
            .setDescription('Bot Commands')
            .setColor('#15ff55')
            .setThumbnail(this.bot.user.displayAvatarURL)
            .addField('server', 'display discord server information')
            .addField('bot', 'display bot information')
            .addField('timer', 'countdown given amount of seconds - requires one numeric argument')
            .addField('random', 'display a random number - optionally, takes lower and upper range as arguments (defaults: 0, 100)')
            .addField('pick', 'randomly pick one of given arguments -requires two or more arguments')
            .addField('twa', 'display TWA player statistics - requires player ID as argument')
            .addField('say', 'echo given arguments');
        this.message.channel.send(helpEmbed);
        return true;
    }

}