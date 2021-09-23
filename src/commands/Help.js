const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const {MessageEmbed} = require('discord.js');

class Help extends PrefixCommand {
    static ERR_COMMAND_NOT_VALID = 1;
    constructor(dataManager) {
        super('help');
        this.dataManager = dataManager;
        this.commandList = {};
        this.prefix = dataManager.constants.prefix;
        this.fullHelpMessage = `❓ \`${this.prefix} help COMMAND\`: general help message, or help about COMMAND if you specify it.\n\n`;
    }
    init(commands) {
        for (const [commandName, command] of Object.entries(commands)) {
            this.commandList[commandName] = {
                shortDescription: command.shortDescription,
                longDescription: command.longDescription,
            };
            if (commandName != 'help') {
                this.fullHelpMessage += command.shortDescription + '\n\n';
            };
        };
    };
    execute(message) {
        const args = utils.getMessageArguments(message);
        if (args.length > 2 && !(args[2] in this.commandList)) {
            message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
            return Help.ERR_COMMAND_NOT_VALID;
        }
        const embed = new MessageEmbed();
        if (args.length <= 2) {
            embed.setTitle('Commands');
            embed.setDescription(this.fullHelpMessage);
        } else {
            embed.setTitle(`Help for ${args[2]}`);
            embed.setDescription(this.commandList[args[2]].longDescription);
        }
        message.reply({embeds: [embed]});
        return 0;
    };
}

module.exports = Help;
