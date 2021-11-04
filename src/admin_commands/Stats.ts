import {AdminCommand, DataManager} from '@modules';
import {Message, Client} from 'discord.js';
import utils = require('@utils');

export class StatsCommand extends AdminCommand {
    name = 'stats';
    constructor(dataManager: DataManager, client: Client) {
        super(dataManager, client);
        this.commandUsage = `${this.prefix} stats`;
        this.shortDescription = `Get various client stats`;
        this.longDescription = this.shortDescription;
    };
    execute(message: Message) {
        var totalUsers = 0;
        const totalServers = this.client.guilds.cache.size
        this.client.guilds.cache.forEach((guild) => totalUsers += guild.memberCount);
        message.reply(`Guilds: ${totalServers}\nTotal users: ${totalUsers}\nAverage size of servers: ${(totalUsers / totalServers).toFixed(2)} human users\nReady at: ${this.client.readyAt}\nUptime: ${utils.msToTime(this.client.uptime ? this.client.uptime : 0)}`);
        return 0;
    };
};
