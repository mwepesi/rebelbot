import { Client } from 'discord.js';

import { Help } from './command/help.command';
import { Server } from './command/server.command';
import { Bot } from './command/bot.command';
import { Twa } from './command/twa.command';
import { Say } from './command/say.command';
import { Unknown } from './command/unknown.command';
import { Random } from './command/random.command';
import { Pick } from './command/pick.command';
import { Timer } from './command/timer.command';

const auth = require('../auth.json');
const botconfig = require('../botconfig.json');

const bot = new Client({ disableEveryone: true });

bot.on('ready', async () => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity(botconfig.activityText, { type: "WATCHING" });
});

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type !== 'text') return;
    if (message.content.length === 0 || message.content[0] !== botconfig.prefix) return;

    let messageArray = message.content.split(' ');

    let command = messageArray[0];

    if (command.length > 1) {
        command = command.substr(botconfig.prefix.length); // remove prefix

        let args = messageArray.slice(1);

        console.log(`Command ${command} received with ${args.length ? args : 'no args'}`);
        switch (command) {
            case 'help':
                new Help(bot, message).run();
                break;
            case 'server':
                new Server(bot, message).run();
                break;
            case 'bot':
                new Bot(bot, message).run();
                break;
            case 'timer':
                new Timer(bot, message).run(args);
                break;
            case 'random':
                new Random(bot, message).run(args);
                break;
            case 'pick':
                new Pick(bot, message).run(args);
                break;
            case 'twa':
                new Twa(bot, message).run(args);
                break;
            case 'say':
                new Say(bot, message).run(args);
                break;
            default:
                new Unknown(bot, message, command).run();
                break;
        }
    }
});

bot.login(auth.token);