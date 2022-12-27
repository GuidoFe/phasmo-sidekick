import {SlashCommandBuilder} from '@discordjs/builders';
import {SlashCommand, DataManager} from '../modules/index.js';
import * as utils from '../utils.js';
import {ChatInputCommandInteraction, EmbedBuilder} from 'discord.js';

export class InviteCommand extends SlashCommand {
    name = 'invite';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.shortDescription = `Invite this bot or join the Support Server`;
        this.longDescription = this.shortDescription;
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
    };
    execute = async (interaction: ChatInputCommandInteraction) => {
        interaction.reply({embeds: [new EmbedBuilder()
                          .setTitle("Invite Links")
                          .setDescription(`[Invite Phasmo Helper in your server](${this.dataManager.constants.inviteLink})\n[Support Discord Server](${this.dataManager.constants.supportInviteLink})`)]})
    }
};
