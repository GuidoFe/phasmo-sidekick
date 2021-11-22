import {PrefixCommand, DataManager} from '@modules';
import utils = require('@utils');
import {Message} from 'discord.js';

export class ItemCommand extends PrefixCommand {
    name = 'item';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.commandUsage = `🔦 ${this.prefix} item`;
        this.shortDescription = `Pick a random item`;
        this.longDescription = this.shortDescription;
    };
    execute(message: Message) {
        message.reply(utils.reinviteEmbed(`${utils.pickRandom(this.dataManager.constants.items)}`, message));
        return 0;
    };
};
