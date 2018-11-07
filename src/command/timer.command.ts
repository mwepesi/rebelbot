import { RichEmbed, Message } from 'discord.js';

import { Command } from './command';

const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;
const ONE_HOUR_MILLIS = 60 * 60 * 1000;
const ONE_MINUTE_MILLIS = 60 * 1000;

export class Timer extends Command {
    millis: number;

    interval: NodeJS.Timeout;
    countdownTime: number;

    validateArgs(args: string[]) {
        if (args.length === 0) {
            this.sendError('Missing argument', 'Timer value in seconds is required');
            return false;
        } else if (args.length > 1) {
            this.sendError('Unexpected number of arguments',
                'Use command with one argument to specify the number of seconds to count down from');
            return false;
        } else if (!/\d/.test(args[0])) {
            this.sendError('Invalid argument', 'Argument must be numeric');
            return false;
        } else {
            this.millis = +args[0] * 1000;
            if (this.millis > 2 * ONE_HOUR_MILLIS) {
                this.sendError('Invalid argument', 'Timer value cannot exceed 2 hours');
                return false;
            }
        }

        return true;
    };

    execute(): boolean {
        let now = new Date().getTime();
        this.countdownTime = now + this.millis;

        let richEmbed = new RichEmbed()
            .setColor('#15ff55')
            .addField(Timer.generateRemainingTime(this.millis), '⏱');

        let lastUpdate = now;

        this.message.channel.send(richEmbed).then((msg: Message) => {
            this.interval = setInterval(() => {
                // Get todays date and time
                let now = new Date().getTime();

                // Find the distance between now and the count down date
                let distance = this.countdownTime - now;

                // If the count down is finished, change display and exit
                if (distance <= 0) {
                    richEmbed = new RichEmbed()
                        .setColor('#e5280b')
                        .addField('Timer has expired!', '⏱');

                    msg.edit(richEmbed);

                    clearInterval(this.interval);

                    return;
                }

                // Wait five seconds for update in order not to impact performance
                if (now - lastUpdate > 5000) {
                    richEmbed = new RichEmbed()
                        .setColor('#15ff55')
                        .addField(Timer.generateRemainingTime(distance), '⏱');
                    msg.edit(richEmbed);

                    lastUpdate = now;
                }
            }, 1000);
        });
        return true;
    }

    private static generateRemainingTime(distance: number): string {
        // Time calculations for hours, minutes and seconds
        let hours = Math.floor((distance % ONE_DAY_MILLIS) / ONE_HOUR_MILLIS);
        let minutes = Math.floor((distance % ONE_HOUR_MILLIS) / ONE_MINUTE_MILLIS);
        let seconds = Math.floor((distance % ONE_MINUTE_MILLIS) / 1000);

        return hours + "h " + minutes + "m " + seconds + "s";
    }
}
