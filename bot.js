const {Client, Intents} = require('discord.js');
require('dotenv').config();
const constants = require('./constants');
const commands = require('./commands');

const client = new Client({intents: [Intents.FLAGS.GUILDS]});
client.once('ready', () => {
    console.log('Ready!');
});
client.login(process.env.TOKEN);

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    switch (interaction.commandName) {
    case 'item':
        await interaction.reply(commands.item());
        break;
    case 'challenge':
        await interaction.reply(commands.challenge());
        break;
    case 'spin':
        const bundle = commands.spin(interaction.options.getString('challenge'));
        console.log('Arguments: %s', interaction.options.getString('challenge'));
        if (bundle.valid) {
            await interaction.reply(bundle.message);
        } else {
            await interaction.reply({content: bundle.message, ephemeral: true});
        }
        break;
    case 'map':
        const stringMaps = interaction.options.getString('maps');
        if (stringMaps != null) {
            const mapList = stringMaps.split(' ').filter( (value, index, arr) => {
                return value != '';
            });
            for (m of mapList) {
                if (!(m in constants.maps)) {
                    await interaction.reply({content: `${m} is not a valid map.`, ephemeral: true});
                    break;
                }
            }
            await interaction.reply(commands.map(mapList));
        } else {
            await interaction.reply(commands.map([]));
        };
        break;
    case 'clues':
        let arg = interaction.options.getString('clues');
        if (!arg) {
            arg = '';
        }
        const cluesNames = arg.split(' ').filter((value, index, arr) => {
            return value != '';
        });
        const wrongArgs = [];
        for (clue of cluesNames) {
            if (!(clue in constants.commonClueNames)) {
                wrongArgs.put(clue);
            }
        }
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                await interaction.reply({content: `${wrongArgs[0]} is not a valid clue`, ephemeral: true});
            } else {
                let stringWrongArgs = '';
                for (w of wrongArgs) {
                    stringWrongArgs + w + ', ';
                }
                stringWrongArgs = stringWrongArgs.splice(0, -2);
                stringWrongArgs += ' are not valid evidence.';
                await interaction.repy({content: stringWrongArgs, ephemeral: true});
            }
        } else {
            await interaction.reply(commands.clues(cluesNames.map((x) => {
                return constants.commonClueNames[x];
            })));
        }

        break;
    default:
        await interaction.reply({content: 'Error: command not valid', ephemeral: true});
    }
});
