import { RichEmbed } from "discord.js";
import { get, RequestOptions } from 'https';
import { createGunzip } from 'zlib';

import { Command } from './command';

const botconfig = require('../../botconfig.json');

const options: RequestOptions = {
    hostname: botconfig.twa.apiServer,
    port: botconfig.twa.apiPort,
    method: 'GET'
}

export class Twa extends Command {

    playerId: string;
    playerOpenId: string;

    validateArgs(args: string[]) {
        if (args.length < 1) {
            this.sendError('Missing argument', botconfig.twa.playerIdInfoMessage);
            return false;
        }

        // Check that the argument is a number
        if (!/\d/.test(args[0])) {
            this.sendError(`Entered player ID, ${args[0]}, is invalid.`, botconfig.twa.playerIdInfoMessage);
            return false;
        }

        this.playerId = args[0];

        return true;
    };

    execute() {
        this.fetchOpenId();
        return true;
    }

    fetchOpenId() {
        this.message.channel.send(`Fetching open id for player ${this.playerId}`);
        options.path = botconfig.twa.openIdEndpoint + this.playerId;
        get(options, (resp) => {
            const { statusCode } = resp;
            let gunzip = createGunzip();
            let data = '';
    
            console.log(`headers: ${JSON.stringify(resp.headers)}`);
    
            if (statusCode !== 200) {
                console.error(`Error: Request failed with status code: ${statusCode}`);
                this.message.react('👎');
                this.sendError('Request failed', `Status code: ${statusCode}`);
                resp.resume();  // consume response data to free up memory
                return;
            }
    
            resp.pipe(gunzip);
    
            // A chunk of data has been received.
            gunzip.on('data', (chunk) => {
                data += chunk;
                console.log(`received new chunk: ${data}`);
            });
    
            // The whole response has been received. Print out the result.
            gunzip.on('end', () => {
                console.log(`Retrieved player's open id: ${data}. Fetching data.`);
                this.message.channel.send(`Player's open id: ${data.substr(0, 9) + `****-****-****-************`}. ` +
                'Fetching profile data.');
                this.playerOpenId = data;
                this.fetchTwaProfileData();
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    };
    
    fetchTwaProfileData() {
        options.path = botconfig.twa.profileInfoEndpoint + `${this.playerOpenId}.json`;
        get(options, (resp) => {
            let gunzip = createGunzip();
            let data = '';
            const { statusCode } = resp;
    
            console.log(`headers: ${JSON.stringify(resp.headers)}`);
    
            if (statusCode !== 200) {
                console.error(`Error: Request failed with status code: ${statusCode}`);
                this.message.react('👎');
                this.sendError('Request failed', `Status code: ${statusCode}`);
                resp.resume();  // consume response data to free up memory
                return;
            }
    
            resp.pipe(gunzip);
    
            // A chunk of data has been received.
            gunzip.on('data', (chunk) => {
                data += chunk;
            });
    
            // The whole response has been received. Print out the result.
            gunzip.on('end', () => {
                let jsonResp = JSON.parse(data);
                // console.log(jsonResp);
                let userIconUrl = this.message.author.displayAvatarURL;
                let twaInfoEmbed = new RichEmbed()
                    .setDescription('TWA Profile Information')
                    .setColor('#55ff45')
                    .setThumbnail(userIconUrl)
                    .addField('Total Kills', jsonResp.totals.kills)
                    .addField('Battles Played', jsonResp.totals.battles_played)
                    .addField('Battles Won', jsonResp.totals.results.victories)
                    .addField('Kill Rate', jsonResp.totals.kills / jsonResp.totals.battles_played)
                    .addField('Win Rate', jsonResp.totals.results.victories / jsonResp.totals.battles_played * 100 + '%');
                this.message.channel.send(twaInfoEmbed);
            });
        }).on("error", (err) => {
            console.log("Error: " + err.message);
        });
    };

}