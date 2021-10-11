/** Test */
import {Client} from 'discord.js';
import {PrefixCommand, DataManager} from '.';
export class AdminCommand  extends PrefixCommand{
    client : Client;
    constructor(dataManager: DataManager, client: Client) {
        super(dataManager);
        this.client = client;
    }
}
