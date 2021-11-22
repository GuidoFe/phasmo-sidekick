import {SlashCommandBuilder} from '@discordjs/builders';
import {DataManager, SlashCommand} from '@modules';
//import  utils = require('@utils');
import {CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} from 'discord.js';

export class HelpCommand extends SlashCommand {
    name = 'help';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.shortDescription = 'Get a list of commands, invite the bot or join the support server';
        this.longDescription = this.shortDescription;
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
    }
    execute = async (interaction: CommandInteraction) => {
        const embed = new MessageEmbed().setTitle("Help")
        embed.addField('❓  `/help`', 'This help message')
        embed.addField("🔦 `/random item`", "Pick a random item")
        embed.addField("🗺️ `/random map LIST`",
                       "Choose a random map between those indicated. If List is empty, it will consider every map")
        embed.addField("🎲 `/random hero Alice Beth Charlie`", "Pick a random player. Useful when you have to decide who must talk alone with the ghost.")
        embed.addField("🌀 `/spin CHALLENGE_NAME`", "Spin the wheel of a particular challenge, if it has one.")
        embed.addField("⚔️ `/challenge`", "Pick a random challenge. Get a list of challenges and their description with `/challenge info CHALLENGE_NAME")
        embed.addField("🔎 `/clues CLUES`", "Show which ghosts are possible with those clues and which evidence is lacking.")
        embed.addField("🎫 `/invite`", "Invite the bot or get an invite to the Support Server");
        const inviteButton = new MessageButton({label: "Invite", url: this.dataManager.constants.inviteLink, style: "LINK"})
        const supportButton = new MessageButton({label: "Support Server", url: this.dataManager.constants.supportInviteLink, style: "LINK"})
        const messageActionRow = new MessageActionRow().addComponents([inviteButton, supportButton])
        interaction.reply({embeds: [embed], components: [messageActionRow]})
    };
};
