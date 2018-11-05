import { RichEmbed } from "discord.js";
import { get, RequestOptions } from 'https';
import { createGunzip } from 'zlib';

import { Command } from './command';

const options: RequestOptions = {
    hostname: 's3-eu-west-1.amazonaws.com',
    port: 443,
    method: 'GET'
}

const playerIdInfoMessage = "Player's nine-digit wargaming ID is needed. Visit https://eu.wargaming.net/personal/ " +
    "and check the __Access Control__ section for `https://eu.wargaming.net/id/123456789-PlayerName`. Player " +
    "ID is the nine-digit number before the dash and player's name.";

export class Twa extends Command {

    playerId: string;
    playerOpenId: string;

    validateArgs(args: string[]) {
        if (args.length < 1) {
            this.message.channel.send(playerIdInfoMessage);
            return false;
        }

        // Check that the argument is a number
        if (!/\d/.test(args[0])) {
            this.message.channel.send(`Entered player ID, ${args[0]}, is invalid.`);
            this.message.channel.send(playerIdInfoMessage);
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
        options.path = `/live-usermap.twaservers.com/wgid/${this.playerId}`;
        get(options, (resp) => {
            const { statusCode } = resp;
            let gunzip = createGunzip();
            let data = '';
    
            console.log(`headers: ${JSON.stringify(resp.headers)}`);
    
            if (statusCode !== 200) {
                let error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
                console.error(error.message);
                this.message.react('👎');
                this.message.channel.send(`Error: ${error.message}`);
                // consume response data to free up memory
                resp.resume();
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
        options.path = `/live-caprofile-profiles.twaservers.com/public/${this.playerOpenId}.json`;
        get(options, (resp) => {
            let gunzip = createGunzip();
            let data = '';
            const { statusCode } = resp;
    
            console.log(`headers: ${JSON.stringify(resp.headers)}`);
    
            if (statusCode !== 200) {
                let error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
                console.error(error.message);
                this.message.react('👎');
                this.message.channel.send(`Error: ${error.message}`);
                // consume response data to free up memory
                resp.resume();
            }
    
            resp.pipe(gunzip);
    
            // A chunk of data has been received.
            gunzip.on('data', (chunk) => {
                data += chunk;
            });
    
            // The whole response has been received. Print out the result.
            gunzip.on('end', () => {
                let jsonResp = JSON.parse(data);
                console.log(jsonResp);
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