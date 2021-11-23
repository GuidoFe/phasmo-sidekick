import {SlashCommandBuilder} from '@discordjs/builders';
import {SlashCommand, DataManager, Ghost} from '@modules';
import utils = require('@utils');
import {CommandInteraction, MessageEmbed} from 'discord.js';
import {ghosts} from '@ghosts';

export class GhostCommand extends SlashCommand {
    name = 'ghost';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.shortDescription = `Get info and trivia about a ghost type`;
        this.longDescription = this.shortDescription;
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
        let ghostOptions: [string, string][] = []
        ghosts.forEach((ghost, key) => {
            ghostOptions.push([ghost.name, key])
        })
        this.command.addStringOption(option => 
                 option
                     .setName('type')
                     .setDescription("Ghost type")
                     .setRequired(true)
                     .addChoices(ghostOptions)
        )
    };
    execute = async (interaction: CommandInteraction) => {
        const ghost = ghosts.get(interaction.options.getString("type", true))!
        const embed = new MessageEmbed()
            .setTitle(ghost.name)
        ghost.clues.forEach(value => embed.setFields([{name: " ", value: this.dataManager.constants.clueNames[value], inline: true}]))
        embed.setFields([{name: "Description", value: ghost.description, inline: false},
                         {name: "Strength", value: ghost.strength, inline: false},
                         {name: "Weakness", value: ghost.weakness, inline: false},
                         {name: "Origin", value: ghost.flag ? `${ghost.flag} ${ghost.origin}` : ghost.origin, inline: false}
        ])
        embed.setFooter("From Phasmophobia Wiki, Wikipedia and Oxford Languages")
        interaction.reply({embeds: [embed]})
    };
};
