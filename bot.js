const {Client, Intents, MessageEmbed} = require('discord.js');
require('dotenv').config();
const constants = require('./constants');
const commands = require('./commands');
const utils = require('./utils');
const PREFIX = constants.prefix;
const client = new Client({intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES]});
client.once('ready', () => {
    console.log('Ready!');
});
client.login(process.env.TOKEN);

const challengeList = function(list) {
    chList = [];
    for (name of list) {
        ch = constants.challenges[name];
        chList.push(`**${ch.name}** (code \`${ch.code}\`)`);
    }
    return utils.formatArrayAsList(chList);
};

client.on('messageCreate', (message) => {
    // Stop if message is received in DMs
    if (!message.guild) return;
    // if (message.guildId != '527614443581079583') return;
    if (!message.content.startsWith(PREFIX)) return;
    const args = message.content.split(' ').filter((value, index, arr) => {
        return value != '';
    });
    if (args.length < 2) {
        const embed = new MessageEmbed().setDescription(commands.help()).setTitle('Commands');
        message.reply({embeds: [embed]});
        return;
    }
    switch (args[1]) {
    case 'item':
        message.reply(commands.item());
        break;
    case 'challenge':
        if (args.length > 2) {
            if (args[2] == 'list') {
                message.reply(challengeList(Object.keys(constants.challenges)));
            } else {
                const challenge = constants.challenges[args[2]];
                if (challenge) {
                    message.reply(`**${challenge['name']}**: ${challenge['desc']}`);
                } else {
                    let msg = `${args[2]} is not a valid challenge.\nPossible challenges:\n`;
                    msg += challengeList(Object.keys(constants.challenges));
                    message.reply(utils.errorMessageBuilder(msg));
                }
            }
        } else {
            const ch = constants.challenges[commands.challenge()];
            message.reply(`**${ch['name']}** (code \`${ch['code']}\`)`);
        }
        break;
    case 'spin':
        if (args[2]) {
            const challengeName = args[2];
            const bundle = commands.spin(challengeName);
            if (bundle.valid) {
                message.reply({embeds: [new MessageEmbed()
                    .setColor(utils.randomVibrantColor())
                    .setTitle(bundle.message.trait)
                    .setDescription(bundle.message.desc)]});
            } else {
                let msg = `Error: ${challengeName} is not a valid challenge. Valid challenges:\n`;
                msg += challengeList(constants.spinnableChallenges);
                message.reply(utils.errorMessageBuilder(msg));
            }
        } else {
            let msg = 'Possible challenges:\n';
            msg += challengeList(constants.spinnableChallenges);
            message.reply(msg);
        }
        break;
    case 'map':
        if (args.length > 2) {
            maps = args.splice(2);
            for (m of maps) {
                if (!(m in constants.maps)) {
                    message.reply(utils.errorMessageBuilder(`${m} is not a valid map.`));
                    return;
                }
            }
            message.reply(commands.map(maps));
        } else {
            message.reply(commands.map([]));
        };
        break;
    case 'clues':
        let cluesList = [];
        if (args.length > 2) {
            cluesList = args.splice(2);
        }
        const wrongArgs = [];
        for (clue of cluesList) {
            if (!(clue in constants.commonClueNames)) {
                wrongArgs.push(clue);
            }
        }
	console.log(wrongArgs);
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue`));
            } else {
                let stringWrongArgs = '';
                for (w of wrongArgs) {
                    stringWrongArgs += w + ', ';
                }
                stringWrongArgs = stringWrongArgs.slice(0, -2);
                stringWrongArgs += ' are not valid evidence.\n\n' + constants.help['clues'];
                message.reply(utils.errorMessageBuilder(stringWrongArgs));
            }
        } else {
            message.reply(commands.clues(cluesList.map((x) => {
                return constants.commonClueNames[x];
            })));
        }
        break;
    case 'help':
        if (args.length > 2 && !(args[2] in constants.help)) {
            message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
            return;
        }
        const embed = new MessageEmbed().setDescription(commands.help(args[2]));
        if (args.length > 2) {
            embed.setTitle(`Help for ${args[2]}`);
        } else {
            embed.setTitle('Commands');
        }
        message.reply({embeds: [embed]});
        break;
    default:
        message.reply(utils.errorMessageBuilder('Error: command not valid'));
    }
});
