import { Command } from './command';

export class Say extends Command {
    args: string[];

    validateArgs(args: string[]) {
        this.args = args;

        return true;
    };

    execute(): boolean {
        this.message.channel.send(this.args.join(' '));
        return true;
    }
}
