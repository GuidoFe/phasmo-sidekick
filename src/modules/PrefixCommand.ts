/** Test */
import {DataManager} from './DataManager';
import {Message} from 'discord.js';
export class PrefixCommand {
    name = '';
    commandUsage = '';
    shortDescription = '';
    longDescription = '';
    dataManager: DataManager;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }
    execute(message: Message): number{
        return 1;
    };
}
