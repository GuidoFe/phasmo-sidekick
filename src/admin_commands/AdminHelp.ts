import {AdminCommand, DataManager} from '@modules';
import utils = require('@utils');
import {Message, MessageEmbed, Client} from 'discord.js';
type ColorType = `#$(string)`;

interface HelpElement {
    shortDescription: string;
    longDescription: string;
    commandUsage: string;
};

export class AdminHelp extends AdminCommand {
    static ERR_COMMAND_NOT_VALID = 1;
    embedColor = '#8766ff' as ColorType;
    name = 'adminHelp';
    embedFullHelpMessage: MessageEmbed;
    commandList: Map<string, HelpElement>
    constructor(dataManager: DataManager, client: Client) {
        super(dataManager, client);
        this.commandUsage = `${this.prefix} adminHelp \`command\``;
        this.shortDescription = 'Help message for admin commands';
        this.longDescription = this.shortDescription;
        this.embedFullHelpMessage = new MessageEmbed().addField(this.commandUsage, this.shortDescription);
        this.embedFullHelpMessage.setTitle('Admin Commands');
        this.commandList = new Map();
    }
    init(commands: Map<string, AdminCommand>) {
        commands.forEach((command: AdminCommand, commandName: string) => {
            this.commandList.set(commandName, {
                shortDescription: command.shortDescription,
                longDescription: command.longDescription,
                commandUsage: command.commandUsage,
            } as HelpElement);
            if (commandName != 'adminHelp') {
                this.embedFullHelpMessage.addField(command.commandUsage, command.shortDescription);
            };
        });
        this.embedFullHelpMessage.setColor(this.embedColor);
    };
    execute(message: Message): number {
        const args = utils.getMessageArguments(message);
        if (args.length > 2 && !(this.commandList.has(args[2]))) {
            message.reply(utils.errorMessageBuilder(`${args[2]} is not a valid command.`));
            return AdminHelp.ERR_COMMAND_NOT_VALID;
        }
        if (args.length <= 2) {
            message.reply({embeds: [this.embedFullHelpMessage]});
        } else {
            const embed = new MessageEmbed();
            embed.setTitle(`Help for ${args[2]}`);
            const seekedCommand = this.commandList.get(args[2]);
            embed.addField(seekedCommand!.commandUsage, seekedCommand!.longDescription);
            embed.setColor(this.embedColor);
            message.reply({embeds: [embed]});
        }
        return 0;
    };
}
