import 'module-alias/register'
//import {REST} from '@discordjs/rest';
import {Routes} from 'discord-api-types/v9';
import {ChallengeCommand} from '@commands'
import {DataManager} from '@modules'
import {constants} from '@constants'
import fetch from 'node-fetch'
//const fetch = require('node-fetch')
import path = require('path')
const challengesFolder = path.dirname(require.resolve('@index')) + '/../challenges';

const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
console.log(`Token: ${process.env.DISCORD_TOKEN}`);
console.log(`URL: https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/guilds/527614443581079583/commands`);
(async () => {
    try {
        const response = await fetch(`https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/guilds/527614443581079583/commands`,
            {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Token': process.env.DISCORD_TOKEN!},
                body: JSON.stringify(new ChallengeCommand(dataManager).command.toJSON())
            })
        console.log(response)
    } catch (error) {
        console.error(error);
    }
})();
