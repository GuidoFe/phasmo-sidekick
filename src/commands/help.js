const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const {MessageEmbed} = require('discord.js');
const help = new PrefixCommand('help');

help.commandList = {};
require('fs').readdirSync('commands').forEach(function(file) {
    if (file != 'help.js') {
        const command = require(`@commands/${file}`);
        help.commandList[command.name] = {
            shortDescription: command.shortDescription,
            longDescription: command.longDescription,
        };
    }
});
help.fullHelpMessage = `❓ \`${constants.prefix} help COMMAND\`: general help message, or help about COMMAND if you specify it\n\n`;
for (command of Object.values(help.commandList)) {
    help.fullHelpMessage += command.shortDescription + '\n\n';
}
help.setCommand((message) => {
    const args = utils.getMessageArguments(message);
    if (args.length > 2 && !(args[2] in help.commandList)) {
        message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
        return;
    }
    const embed = new MessageEmbed();
    if (args.length == 2) {
        embed.setTitle('Commands');
        embed.setDescription(help.fullHelpMessage);
    } else {
        embed.setTitle(`Help for ${args[2]}`);
        embed.setDescription(help.commandList[args[2]].longDescription);
    }
    message.reply({embeds: [embed]});
});

module.exports = help;
