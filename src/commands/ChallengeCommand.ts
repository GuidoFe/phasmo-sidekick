import {SlashCommandBuilder} from '@discordjs/builders';
import {DataManager, SlashCommand} from '../modules/index.js';
import  * as utils from '../utils.js';
import {ChatInputCommandInteraction} from 'discord.js';

export class ChallengeCommand extends SlashCommand {
    name = 'challenge';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.shortDescription = 'Pick a random challenge created by the Phasmophobia community.';
        this.longDescription = this.shortDescription;
        let challenges: {name: string; value: string}[] = []
        this.dataManager.challengesList.forEach((value, _key)=> {
            challenges.push({name: value.name, value: value.code})
        });
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
        this.command.addSubcommand((subCommand) => subCommand
                                   .setName("random")
                                   .setDescription("Pick a random challenge"))
        this.command.addSubcommand((subCommand) => subCommand
                                   .setName("info")
                                   .setDescription("Get info about a challenge")
                                   .addStringOption(option => 
                                          option
                                           .setName("name")
                                           .setDescription("Get info about a specific challenge")
                                           .setRequired(true)
                                           .addChoices(...challenges)
                                   ));
    }
    execute = async (interaction: ChatInputCommandInteraction) => {
        const challenges = this.dataManager.challengesList;
        if (interaction.options.getSubcommand() === "random") {
            const randomChallenge = challenges.get(utils.pickRandom(Array.from(challenges.keys())));
            if (randomChallenge)
                await interaction.reply(`**${randomChallenge.name}**: ${randomChallenge.desc}`)
        } else if (interaction.options.getSubcommand() === "info") {
            const challengeName = interaction.options.getString("name", true)
            const challenge = challenges.get(challengeName)
            if (challenge)
                await interaction.reply(`**${challenge.name}**: ${challenge.desc}`)
        }
    };
};
