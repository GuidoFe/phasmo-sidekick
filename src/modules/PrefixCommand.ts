/** Test */
import {DataManager} from './DataManager';
import {Message} from 'discord.js';
export class PrefixCommand {
    name = '';
    commandUsage = '';
    shortDescription = '';
    longDescription = '';
    dataManager: DataManager;
    prefix: string;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
    }
    execute(message: Message): number{
        return 1;
    };
}
