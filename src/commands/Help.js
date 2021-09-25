const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const {MessageEmbed} = require('discord.js');

class Help extends PrefixCommand {
    static ERR_COMMAND_NOT_VALID = 1;
    constructor(dataManager) {
        super('help');
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
        this.commandUsage = `❓ ${this.prefix} help \`command\``;
        this.shortDescription = 'General help message, or help about `command` if you specify it.';
        this.longDescription = this.shortDescription;
        this.embedFullHelpMessage = new MessageEmbed().addField(this.commandUsage, this.shortDescription);
        this.embedFullHelpMessage.setTitle('Commands');
        this.commandList = {'help': {}};
    }
    init(commands) {
        for (const [commandName, command] of Object.entries(commands)) {
            this.commandList[commandName] = {
                shortDescription: command.shortDescription,
                longDescription: command.longDescription,
                commandUsage: command.commandUsage,
            };
            if (commandName != 'help') {
                this.embedFullHelpMessage.addField(command.commandUsage, command.shortDescription);
            };
        };
    };
    execute(message) {
        const args = utils.getMessageArguments(message);
        if (args.length > 2 && !(args[2] in this.commandList)) {
            message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
            return Help.ERR_COMMAND_NOT_VALID;
        }
        if (args.length <= 2) {
            message.reply({embeds: [this.embedFullHelpMessage]});
        } else {
            const embed = new MessageEmbed();
            embed.setTitle(`Help for ${args[2]}`);
            const seekedCommand = this.commandList[args[2]];
            embed.addField(seekedCommand.commandUsage, seekedCommand.longDescription);
            message.reply({embeds: [embed]});
        }
        return 0;
    };
}

module.exports = Help;
