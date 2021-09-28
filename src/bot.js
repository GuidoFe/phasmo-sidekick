require('module-alias/register');
const {Client, Intents} = require('discord.js');
require('dotenv').config({path: '../.env'});
const constants = require('@constants');
const DataManager = require('@modules/DataManager');
const path = require('path');
const challengesFolder = path.dirname(require.resolve('@index')) + '/challenges';
const commandsFolder = path.dirname(require.resolve('@index')) + '/commands';
const CommandManager = require('@modules/CommandManager');
const utils = require('@utils');
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
const commandManager = new CommandManager(commandsFolder, dataManager);
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
// const statusMessages = [
//     {message: 'with the light switches', type: 0},
//     {message: 'you through the window', type: 3},
//     {message: 'people screaming 👻', type: 2},
//     {message: 'basketball in the lobby', type: 0},
// ];
client.once('ready', () => {
    console.log('Ready!');
    console.log(`Currently in ${client.guilds.cache.size} servers.`);
    client.user.setActivity(`in ${client.guilds.cache.size} servers | !ph`, 0);
    setInterval(()=>{
        client.user.setActivity(`in ${client.guilds.cache.size} servers | !ph`, 0);
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
