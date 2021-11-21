/** Test */
import {DataManager} from './DataManager';
import {Interaction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
export class SlashCommand {
    name = '';
    shortDescription = '';
    longDescription = '';
    dataManager: DataManager;
    prefix: string;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
    }
    execute: (interaction: Interaction) => Promise<void>;
    command: SlashCommandBuilder;

}
