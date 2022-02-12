import {SlashCommandBuilder} from '@discordjs/builders';
import {SlashCommand, DataManager} from '@modules';
import utils = require('@utils');
import {CommandInteraction} from 'discord.js';

export class RandomCommand extends SlashCommand {
    name = 'random';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.shortDescription = `Get a random item or map`;
        this.longDescription = this.shortDescription;
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
        this.command.addSubcommand((subCommand) => subCommand
                                  .setName("item")
                                  .setDescription("Get a random item"))
        this.command.addSubcommand((subCommand) => subCommand
                                   .setName("map")
                                   .setDescription("Get a random map from all those available or from a list you specify")
                                   .addStringOption(option => 
                                        option
                                            .setName('map_list')
                                            .setDescription("List of maps you want to pick from. Example: 'grafton willow' or 'graf school asylum'")
                                            .setRequired(false)
                                   )
                                  )
        this.command.addSubcommand((subCommand) => subCommand
                                   .setName("hero")
                                   .setDescription("Draw who will have to do that dangerous mission, or who has to have a private chat with the ghost.")
                                   .addStringOption(option => 
                                        option
                                            .setName('players')
                                            .setDescription("Name of the players, separated by space")
                                            .setRequired(true)
                                   )
                                  )
        this.command.addSubcommand((subCommand) => subCommand
                                   .setName("challenge")
                                   .setDescription("Get a random challenge")
                                  )
    };
    execute = async (interaction: CommandInteraction) => {
        const subCommand = interaction.options.getSubcommand(true)
        switch (subCommand) {
            case "item":
                interaction.reply(utils.pickRandom(this.dataManager.constants.items));
                break;
            case "map":
                const mapList = interaction.options.getString("map_list")
                if (mapList != null)
                    interaction.reply(utils.pickRandom(mapList.split(" ")))
                else
                    interaction.reply(utils.pickRandom(Array.from(this.dataManager.constants.maps.values())))
                break;
            case "hero":
                const player = utils.pickRandom(interaction.options.getString("players", true).split(" "))
                interaction.reply(player)
                break;
            case "challenge":
                const challenge = utils.pickRandom(Array.from(this.dataManager.challengesList.values()))
                interaction.reply(`**${challenge.name}**: ${challenge.desc}`)
                break;
        }
    };
};
