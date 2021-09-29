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
const statusMessages = [
    {message: 'basketball', type: 0},
    {message: 'Ghostbusters', type: 3},
    {message: 'Casper', type: 3},
    {message: 'with the Ouija', type: 0},
    {message: 'The Shining', type: 3},
    {message: 'Phasmophobia', type: 0},
    {message: () => {
        return `in ${client.guilds.cache.size} servers`;
    }, type: 0},
];
const updateActivity = function() {
    activity = utils.pickRandom(statusMessages);
    let msg = '';
    if (typeof activity.message === 'function') {
        msg = activity.message();
    } else {
        msg = activity.message;
    }
    client.user.setActivity(`${msg} | !ph`, {type: activity.type});
};
client.once('ready', () => {
    const s = 'Hello m\'lady';
    utils.sendLogMessage(s);
    console.log('Ready!');
    console.log(`Currently in ${client.guilds.cache.size} servers.`);
    updateActivity();
    setInterval(()=>{
        updateActivity();
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
