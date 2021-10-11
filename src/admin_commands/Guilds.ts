import {AdminCommand, DataManager} from '@modules';
import {Message, Client} from 'discord.js';

export class ItemCommand extends AdminCommand {
    name = 'guilds';
    constructor(dataManager: DataManager, client: Client) {
        super(dataManager, client);
        this.commandUsage = `${this.prefix} guilds`;
        this.shortDescription = `Get number of guilds`;
        this.longDescription = this.shortDescription;
    };
    execute(message: Message) {
        message.reply(`Currently in ${this.client.guilds.cache.size} guilds`);
        return 0;
    };
};
