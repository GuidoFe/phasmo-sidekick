import {SlashCommand, DataManager} from '../modules/index.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import * as utils from '../utils.js';
import {EmbedBuilder, ChatInputCommandInteraction} from 'discord.js';
export class SpinCommand extends SlashCommand {
    name = 'spin';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.dataManager = dataManager;
        this.shortDescription = `Spin the wheel of a challenge, if it has one.`;
        this.longDescription = this.shortDescription;
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
        this.command.addStringOption(option => 
            option
                .setName("challenge")
                .setDescription("Challenge that has the wheel you want to spin")
                .setRequired(true)
                .addChoices(...dataManager.spinnableChallenges.map(code => {
                    const challenge = dataManager.challengesList.get(code);
                    return {name: challenge!.name, value: code}
                }))
        )
    };
    execute = async (interaction: ChatInputCommandInteraction) => {
        const challenge = this.dataManager.challengesList.get(interaction.options.getString("challenge", true))!;
        const wheel = challenge.wheel;
        let trait='ERR';
        let description='';
        if (challenge.hasDuplicates) {
            trait = utils.pickRandom(challenge.pool);
            description = wheel.get(trait)!.desc;
        } else {
            trait = utils.pickRandom(Array.from(wheel.keys()));
            description = wheel.get(trait)!.desc;
        }
        interaction.reply({embeds: [new EmbedBuilder()
            .setColor(utils.randomVibrantColor())
            .setTitle(trait)
            .setDescription(description)]});
    };
};
