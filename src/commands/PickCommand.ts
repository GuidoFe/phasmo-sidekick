import {PrefixCommand, DataManager} from '@modules';
import utils = require('@utils');
import {Message} from 'discord.js';

export class PickCommand extends PrefixCommand {
    static ERR_NO_ARGS = 1;
    name = 'pick';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.commandUsage = `🎲 ${this.prefix} pick \`A B C ...\``;
        this.shortDescription = `Pick a random element from the specified list. Useful when deciding who should talk with the ghost alone.`;
        this.longDescription = `${this.shortDescription} Example: \`${this.prefix} pick Georgina Darlene Martin\``;
    }
    execute(message: Message) {
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            const pool = args.slice(2);
            message.reply(utils.reinviteEmbed(`${utils.pickRandom(pool)}`, message));
            return 0;
        } else {
            message.reply(utils.errorMessageBuilder(this.longDescription));
            return PickCommand.ERR_NO_ARGS;
        }
    };
};
