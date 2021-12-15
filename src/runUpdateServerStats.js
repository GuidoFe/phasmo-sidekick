const {Client, Intents} = require('discord.js');
// import * as dotenv from "dotenv";
// dotenv.config({path: '../.env'});
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
const serverStats = require('./updateServerStats.js');
client.once('ready', () => {
    console.log('Ready!');
    serverStats(client);
});
client.login(process.env.TOKEN);
