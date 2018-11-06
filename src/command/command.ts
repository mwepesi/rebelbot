import { Client, Message, RichEmbed } from "discord.js";

export abstract class Command {

    constructor(public bot: Client, public message: Message) { }

    run(args?: string[]) {
        if (this.validateArgs(args) && this.execute()) {
            this.message.react('👍');
        } else {
            this.message.react('👎');
        }
    }

    protected abstract validateArgs(args?: string[]): boolean;

    protected abstract execute(): boolean;

    protected sendError(errorTitle: string, errorDescription: string) {
        let richEmbed = new RichEmbed()
            .setDescription('Error')
            .setColor('#e5280b')
            .addField(errorTitle, errorDescription);
        this.message.channel.send(richEmbed);
    }
}
