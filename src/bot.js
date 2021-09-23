require('module-alias/register');
const {Client, Intents} = require('discord.js');
require('dotenv').config({path: '../.env'});
const constants = require('@constants');
const DataManager = require('@modules/DataManager');
const path = require('path');
const challengesFolder = path.dirname(require.resolve('@index')) + '/challenges';
const commandsFolder = path.dirname(require.resolve('@index')) + '/commands';
const CommandManager = require('@modules/CommandManager');
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
const commandManager = new CommandManager(commandsFolder, dataManager);
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
client.once('ready', () => {
    console.log('Ready!');
});
client.login(process.env.TOKEN);
client.on('messageCreate', async (message) => {
    // Stop if message is received in DMs
    if (!message.guild) return;
    // if (message.guildId != '527614443581079583') return;
    commandManager.parseMessage(message);
});
