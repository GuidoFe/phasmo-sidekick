import {SlashCommandBuilder} from '@discordjs/builders';
import {DataManager, SlashCommand} from '../modules';
//import  utils = require('@utils');
import {ChatInputCommandInteraction, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle} from 'discord.js';

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
    execute = async (interaction: ChatInputCommandInteraction) => {
        const embed = new EmbedBuilder().setTitle("Help")
        embed.addFields(
            {name: '❓  /help', value: 'This help message'},
        	{name: "🔦 /random item", value: "Pick a random item"},
        	{name: "🗺️ /random map LIST", value:"Choose a random map between those indicated. If List is empty, it will consider every map"},
        	{name: "🎲 /random hero Alice Beth Charlie", value: "Pick a random player. Useful when you have to decide who must talk alone with the ghost."},
        	{name: "🌀 /spin CHALLENGE_NAME", value: "Spin the wheel of a particular challenge, if it has one."},
        	{name: "⚔️ /challenge", value: "Pick a random challenge. Get a list of challenges and their description with `/challenge info CHALLENGE_NAME"},
        	{name: "👻 /ghost", value: "Get info and trivia about a ghost"},
        	{name: "🔎 /clues CLUES", value: "Show which ghosts are possible with those clues and which evidence is lacking."},
        	{name: "🎟️ /invite", value: "Invite the bot or get an invite to the Support Server"},
        	{name: "\u200b", value: "Art by [Freepik](https://www.freepik.com)"}
        )
        const upvoteButton = new ButtonBuilder({label: "👍 Vote", url: 'https://top.gg/bot/887086717587320852/vote', style: ButtonStyle.Link})
        const inviteButton = new ButtonBuilder({label: "🎟️ Invite", url: this.dataManager.constants.inviteLink, style: ButtonStyle.Link})
        const supportButton = new ButtonBuilder({label: "ℹ️ Support Server", url: this.dataManager.constants.supportInviteLink, style: ButtonStyle.Link})
        const donateButton = new ButtonBuilder({label: "💜 Donate", url: "https://ko-fi.com/guidoferri55063", style: ButtonStyle.Link})
        const reviewButton = new ButtonBuilder({label: "⭐ Review", url: 'https://top.gg/bot/887086717587320852', style: ButtonStyle.Link})
        const messageActionRow = new ActionRowBuilder().addComponents(upvoteButton, reviewButton, inviteButton, donateButton, supportButton)
        interaction.reply({embeds: [embed], components: [messageActionRow as ActionRowBuilder<ButtonBuilder>]})
    };
};
