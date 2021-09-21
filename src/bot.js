require('module-alias/register');
const {Client, Intents, MessageEmbed} = require('discord.js');
require('dotenv').config({path: '../.env'});
const constants = require('@constants');
const utils = require('@utils');
const PREFIX = constants.prefix;
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
    if (!message.content.startsWith(PREFIX)) return;
    const args = utils.getMessageArguments(message);
    if (args.length < 2) {
        const embed = new MessageEmbed().setDescription(commands.help()).setTitle('Commands');
        message.reply({embeds: [embed]});
        return;
    }
    switch (args[1]) {
    case 'item':
        const item = require('@commands/item');
        item.execute(message);
        break;
    case 'challenge':
        const challenge = require('@commands/challenge');
        challenge.execute(message);
        break;
    case 'spin':
        const spin = require('@commands/spin');
        spin.execute(message);
        break;
    case 'map':
        const map = require('@commands/map');
        map.execute(message);
        break;
    case 'clues':
        const clues = require('@commands/clues');
        clues.execute(message);
        break;
    case 'help':
        const help = require('@commands/help');
        help.execute(message);
        break;
    default:
        message.reply(utils.errorMessageBuilder('Error: command not valid'));
    }
});
