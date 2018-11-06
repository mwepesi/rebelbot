import { Client, Message } from "discord.js";

import { Command } from './command';

export class Unknown extends Command {
    
    constructor(bot: Client, message: Message, public command: string) {
        super(bot, message);
    }

    validateArgs = () => true;

    execute(): boolean {
        this.sendError('Unknown command', `I don't know how to ${this.command}. Use help command to see which commands are supported.`);
        return false;
    }

}