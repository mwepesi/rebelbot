import { RichEmbed } from "discord.js";

import { Command } from './command';

const pkg = require('../../package.json');

export class Bot extends Command {

    validateArgs = () => true;

    execute(): boolean {
        let infoEmbed = new RichEmbed()
            .setDescription('Bot Information')
            .setColor('#15ff55')
            .setThumbnail(this.bot.user.displayAvatarURL)
            .addField('Bot Name', this.bot.user.username)
            .addField('Author', 'Mwepesi / The Rebel Alliance')
            .addField('Version', pkg.version);
        this.message.channel.send(infoEmbed);
        return true;
    }

}