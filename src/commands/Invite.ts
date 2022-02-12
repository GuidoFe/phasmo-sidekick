import {SlashCommandBuilder} from '@discordjs/builders';
import {SlashCommand, DataManager} from '@modules';
import utils = require('@utils');
import {CommandInteraction, MessageEmbed} from 'discord.js';

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
    execute = async (interaction: CommandInteraction) => {
        interaction.reply({embeds: [new MessageEmbed()
                          .setTitle("Invite Links")
                          .setDescription(`[Invite Phasmo Helper in your server](${this.dataManager.constants.inviteLink})\n[Support Discord Server](${this.dataManager.constants.supportInviteLink})`)]})
    }
};
