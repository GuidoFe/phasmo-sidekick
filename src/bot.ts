import 'module-alias/register';
import {Client, Intents, ActivityOptions} from 'discord.js';
// import * as dotenv from "dotenv";
// dotenv.config({path: '../.env'});
import {DataManager, CommandManager, PrefixCommand, AdminCommand} from '@modules';
import utils = require('@utils');
import path = require('path');
import express = require('express');
const ICON_SIZE = 64;
import RateLimit = require('express-rate-limit');
const challengesFolder = path.dirname(require.resolve('@index')) + '/../challenges';
import {constants} from '@constants';
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
import commandLibrary = require('@commands');
import adminCommandLibrary = require('@adminCommands');
const commandClasses = new Map<string, typeof PrefixCommand>(Object.entries(commandLibrary));
const adminCommandClasses = new Map<string, typeof AdminCommand>(Object.entries(adminCommandLibrary));
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
const commandManager = new CommandManager(dataManager, commandClasses, adminCommandClasses, client);
import updateServerStats = require('./updateServerStats');
const statusMessages: ActivityOptions[] = [
    {name: '_NUM_SERVERS', type: 0},
    {name: 'basketball', type: 0},
    {name: 'Ghostbusters', type: 3},
    {name: 'Casper', type: 3},
    {name: 'with the Ouija', type: 0},
    {name: 'The Shining', type: 3},
    {name: 'Phasmophobia', type: 0},
];

function updateActivity(client: Client, statusMessages: ActivityOptions[]) {
    const activity = utils.pickRandom(statusMessages);
    let line = '';
    if (activity.name == '_NUM_SERVERS'){
        line = `in ${client.guilds.cache.size} servers`;
    } else {
        line = activity.name!;
    }
    client.user!.setActivity(`${line} | !ph`, {type: activity.type});
}

client.once('ready', () => {
    console.log('Ready!');
    console.log(`Currently in ${client.guilds.cache.size} servers.`);
    updateActivity(client, [statusMessages[0]]);
    setInterval(()=>{
        updateActivity(client, statusMessages);
    }, 120000);
    updateServerStats(client);
    setInterval(() => {updateServerStats(client);}, 1800000);

    const app = express();
    const limiter = RateLimit({
          windowMs: 15*60*1000, // 15 minutes
            max: 100, // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);
    app.get('/serverlist', async (_request, response)=>{
        let content = '';
        client.guilds.cache.forEach((guild, _key, _map) => {
            content += '<tr>\n';
            content += `<td><img src="${guild.iconURL({dynamic: true, size: ICON_SIZE})}" height=${ICON_SIZE} width=${ICON_SIZE}></img></td>\n`;
            content += `<td>${guild.name}</td>\n`;
            content += `<td>${guild.memberCount}</td>\n`;
            content += `<td>${(guild.description == undefined) ? "" : guild.description}</td>\n`;
            content += '</tr>\n';
        });
        const page = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8"/>
</head>
<body style="background-color:#2e3440; color:#d8dee9">
<p>
Number of servers: ${client.guilds.cache.size}
</p>
<table>
<tr>
<th>Icon</th>
<th>Name</th>
<th>Member Count</th>
<th>Description</th>
</tr>
${content}
</table>
</body>
</html>`;
        response.send(page);
        console.log(`\n\nCurrently in ${client.guilds.cache.size} servers.`);
    });
    app.listen(process.env.PORT, () => console.log(`App available on port ${process.env.PORT}`));
});
client.login(process.env.TOKEN);
client.on('messageCreate', async (message) => {
    // Stop if message is received in DMs
    if (!message.guild) return;
    // if (message.guildId != '527614443581079583') return;
    // Check if author is a bot
    if (message.author?.bot) return;
    commandManager.parseMessage(message);
});
client.on('guildCreate', (guild) => {
    utils.sendLogMessage(`Joined new Guild: ${guild.name}\n${guild.iconURL({dynamic: true, size: 4096})}`);
});
