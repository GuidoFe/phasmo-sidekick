import 'module-alias/register';
import {Client, Intents, ActivityOptions} from 'discord.js';
import * as dotenv from "dotenv";
dotenv.config({path: '../.env'});
import {DataManager, CommandManager, PrefixCommand} from '@modules';
import utils = require('@utils');
import path = require('path');
const challengesFolder = path.dirname(require.resolve('@index')) + '/../challenges';
import {constants} from '@constants';
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
import commandLibrary = require('@commands');
const commandClasses = new Map<string, typeof PrefixCommand>(Object.entries(commandLibrary));
const commandManager = new CommandManager(dataManager, commandClasses);
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
const statusMessages: ActivityOptions[] = [
    {name: 'with the light switches', type: 0},
    {name: 'you through the window', type: 3},
    {name: 'people screaming 👻', type: 2},
    {name: 'basketball in the lobby', type: 0},
];
client.once('ready', () => {
    console.log('Ready!');
    console.log(`Currently in ${client.guilds.cache.size} servers.`);
    setInterval(()=>{
        const activity = utils.pickRandom(statusMessages);
        client.user!.setActivity(activity.name || '', {type: activity.type});
    }, 60000);
});
client.login(process.env.TOKEN);
client.on('messageCreate', async (message) => {
    // Stop if message is received in DMs
    if (!message.guild) return;
    // if (message.guildId != '527614443581079583') return;
    commandManager.parseMessage(message);
});
client.on('guildCreate', (guild) => {
    utils.sendLogMessage(`Joined new Guild: ${guild.name}\n${guild.iconURL({dynamic: true, size: 4096})}`);
});
