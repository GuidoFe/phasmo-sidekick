import {SlashCommandBuilder} from '@discordjs/builders';
import {SlashCommand, DataManager, Ghost} from '@modules';
import utils = require('@utils');
import {CommandInteraction, MessageEmbed, MessageAttachment} from 'discord.js';
import {ghosts} from '@ghosts';
import fs = require('fs');

export class GhostCommand extends SlashCommand {
    name = 'ghost';
    nThumbnails = 0
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
        this.nThumbnails = fs.readdirSync('../res/images/ghosts').length
    };
    execute = async (interaction: CommandInteraction) => {
        const ghost = ghosts.get(interaction.options.getString("type", true))!
        const embed = new MessageEmbed()
            .setTitle(ghost.name)
        let clues: {name: string, value: string, inline: boolean}[] = []
        const attachment = new MessageAttachment(`../res/images/ghosts/ghost${utils.getRandomInt(this.nThumbnails)}.png`, "ghostie")
        ghost.clues.forEach((value, index) => clues.push({name: index == 0 ? "Evidence" : "\u200b", value: `${this.dataManager.constants.clueEmoji[value]} ${this.dataManager.constants.clueNames[value]}`, inline: true}))
        embed.setFields([...clues,
                         {name: "Description", value: ghost.description, inline: false},
                         {name: "Strength", value: ghost.strength, inline: false},
                         {name: "Weakness", value: ghost.weakness, inline: false},
                         {name: "Origin", value: ghost.flag ? `${ghost.flag} ${ghost.origin}` : ghost.origin, inline: false}
        ])
        embed.setColor(utils.randomVibrantColor())
        embed.setThumbnail('attachment://ghostie')
        //embed.setDescription(`**Origin**\n\n${ghost.flag ? `${ghost.flag} ${ghost.origin}` : ghost.origin}`)
        embed.setFooter("From Phasmophobia Wiki, Wikipedia and Oxford Languages.")
//        const thumbnailUrl = `https://${process.env.RAILWAY_STATIC_URL}/res/images/ghosts/ghost${utils.getRandomInt(this.nThumbnails)}.png`
 //       embed.setThumbnail(thumbnailUrl)

        await interaction.reply({embeds: [embed]})
    };
};
