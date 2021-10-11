import {AdminCommand, DataManager} from '@modules';
import {Message, Client} from 'discord.js';
import utils = require('@utils');

export class UptimeCommand extends AdminCommand {
    name = 'uptime';
    constructor(dataManager: DataManager, client: Client) {
        super(dataManager, client);
        this.commandUsage = `${this.prefix} uptime`;
        this.shortDescription = `How long it has been since the client last entered the READY state in milliseconds`;
        this.longDescription = this.shortDescription;
    };
    execute(message: Message) {
        if (this.client.uptime != null) {
            message.reply(`${utils.msToTime(this.client.uptime)}`);
            return 0;
        } else {
            message.reply('Uptime not available');
            return 1;
        }
    };
};
