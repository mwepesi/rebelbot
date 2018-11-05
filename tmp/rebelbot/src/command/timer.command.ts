import { Command } from './command';

const ONE_HOUR_MILLIS = 60 * 60 * 1000;

export class Timer extends Command {
    millis: number;

    interval: NodeJS.Timeout;
    countdownTime: number;

    validateArgs(args: string[]) {
        if (args.length === 0) {
            this.message.channel.send('Timer value is required');
            return false;
        } else if (args.length > 1) {
            this.message.channel.send('Unexpected number of arguments; use command with one argument to specify' +
                ' the number of seconds to count down from');
            return false;
        } else if (!/\d/.test(args[0])) {
            this.message.channel.send('Argument must be numeric');
            return false;
        } else {
            this.millis = +args[0] * 1000;
            if (this.millis > 2 * ONE_HOUR_MILLIS) {
                this.message.channel.send('Timer value cannot exceed 2 hours');
                return false;
            }
        }

        return true;
    };

    execute(): boolean {
        this.countdownTime = new Date().getTime() + this.millis;

        this.interval = setInterval(() => {
            // Get todays date and time
            let now = new Date().getTime();
    
            // Find the distance between now and the count down date
            let distance = Math.floor((this.countdownTime - now) / 1000);
    
            if (distance === 3600) {
                this.message.channel.send('One hour remaining');
            } else if (distance === 600) {
                this.message.channel.send('Ten minutes remaining');
            } else if (distance === 120) {
                this.message.channel.send('Two minutes remaining');
            } else if (distance === 60) {
                this.message.channel.send('One minute remaining');
            } else if (distance === 30) {
                this.message.channel.send('Thirty seconds remaining');
            } else if (distance === 10) {
                this.message.channel.send('Ten seconds remaining');
            }
    
            // If the count down is finished, write some text 
            if (distance <= 0) {
                clearInterval(this.interval);
                this.message.channel.send('Timer has expired');
            }
        }, 1000);
        return true;
    }

}