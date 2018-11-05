import { Command } from './command';

export class Pick extends Command {
    args: string[];

    validateArgs(args: string[]) {
        if (args.length < 2) {
            this.message.channel.send('Two or more arguments are required');
            return false;
        }

        this.args = args;

        return true;
    };

    execute(): boolean {
        let index = Math.floor(Math.random() * this.args.length);
        this.message.channel.send(this.args[index]);
        return true;
    }

}