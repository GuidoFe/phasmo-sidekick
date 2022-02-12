/** Test */
import {DataManager} from './DataManager';
import {Interaction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
export class SlashCommand {
    name = '';
    shortDescription = '';
    longDescription = '';
    dataManager: DataManager;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }
    execute: (interaction: Interaction) => Promise<void>;
    command: SlashCommandBuilder;

}
