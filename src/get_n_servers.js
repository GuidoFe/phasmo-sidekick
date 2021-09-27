require('module-alias/register');
const {Client, Intents} = require('discord.js');
require('dotenv').config({path: '../.env'});
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
client.once('ready', () => {
    console.log(`Currently in ${client.guilds.cache.size} servers.`);
});
client.login(process.env.TOKEN);
