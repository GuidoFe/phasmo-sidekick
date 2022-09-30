/** Test */
import {DataManager} from './DataManager';
import {ChatInputCommandInteraction} from 'discord.js';
import {SlashCommandBuilder} from '@discordjs/builders';
export class SlashCommand {
    name = '';
    shortDescription = '';
    longDescription = '';
    dataManager: DataManager;
    constructor(dataManager: DataManager) {
        this.dataManager = dataManager;
    }
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
    command: SlashCommandBuilder;

}
