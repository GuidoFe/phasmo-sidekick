import {PrefixCommand, DataManager} from '@modules';
import utils = require('@utils');
import {Message, MessageEmbed} from 'discord.js';

interface HelpElement {
    shortDescription: string;
    longDescription: string;
    commandUsage: string;
};

export class HelpCommand extends PrefixCommand {
    static ERR_COMMAND_NOT_VALID = 1;
    prefix: string;
    name = 'help';
    embedFullHelpMessage: MessageEmbed;
    commandList: Map<string, HelpElement>
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.prefix = dataManager.constants.prefix;
        this.commandUsage = `❓ ${this.prefix} help \`command\``;
        this.shortDescription = 'General help message, or help about `command` if you specify it.';
        this.longDescription = this.shortDescription;
        this.embedFullHelpMessage = new MessageEmbed().addField(this.commandUsage, this.shortDescription);
        this.embedFullHelpMessage.setTitle('Commands');
        this.commandList = new Map();
    }
    init(commands: Map<string, PrefixCommand>) { 
        commands.forEach((command: PrefixCommand, commandName: string) => {
            this.commandList.set(commandName, {
                shortDescription: command.shortDescription,
                longDescription: command.longDescription,
                commandUsage: command.commandUsage,
            } as HelpElement);
            if (commandName != 'help') {
                this.embedFullHelpMessage.addField(command.commandUsage, command.shortDescription);
            };
        });
    };
    execute(message: Message): number {
        const args = utils.getMessageArguments(message);
        if (args.length > 2 && !(this.commandList.has(args[2]))) {
            message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
            return HelpCommand.ERR_COMMAND_NOT_VALID;
        }
        if (args.length <= 2) {
            message.reply({embeds: [this.embedFullHelpMessage]});
        } else {
            const embed = new MessageEmbed();
            embed.setTitle(`Help for ${args[2]}`);
            const seekedCommand = this.commandList.get(args[2]);
            embed.addField(seekedCommand!.commandUsage, seekedCommand!.longDescription);
            message.reply({embeds: [embed]});
        }
        return 0;
    };
}

