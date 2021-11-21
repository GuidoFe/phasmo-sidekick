import 'module-alias/register';
import {Client, Intents, ActivityOptions} from 'discord.js';
// import * as dotenv from "dotenv";
// dotenv.config({path: '../.env'});
import {DataManager, CommandManager, SlashCommand, AdminCommand} from '@modules';
import utils = require('@utils');
import path = require('path');
const challengesFolder = path.dirname(require.resolve('@index')) + '/../challenges';
import {constants} from '@constants';
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
import commandLibrary = require('@commands');
import adminCommandLibrary = require('@adminCommands');
const commandClasses = new Map<string, typeof SlashCommand>(Object.entries(commandLibrary));
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
    {name: 'the guitar', type: 0},
    {name: 'Nightmare mode', type: 0},
    {name: 'the bonfire', type: 3},
    {name: 'cornhole', type: 0},
    {name: 'ring toss', type: 0},
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
});
client.login(process.env.TOKEN);
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if(interaction.user.bot) return;
    commandManager.run(interaction.commandName, interaction)
});
//client.on('guildCreate', (guild) => {
//    utils.sendLogMessage(`Joined new Guild: ${guild.name} (${guild.memberCount})\nDescription: ${guild.description}\n${guild.iconURL({dynamic: true, size: 2048})}`);
//});
