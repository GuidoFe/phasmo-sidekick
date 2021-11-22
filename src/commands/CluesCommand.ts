import {Constants, SlashCommand, DataManager} from '@modules';
import {SlashCommandBuilder} from '@discordjs/builders'
import utils = require('@utils');
import {CommandInteraction} from 'discord.js';

export class CluesCommand extends SlashCommand {
    name = 'clues';
    constants:Constants;
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.constants = dataManager.constants;
        this.shortDescription = `Show which ghosts are possible with those clues and which evidence is lacking.`;
        this.longDescription = this.shortDescription
        let clueChoices: [string, string][] = [["None", "-1"]]
        this.constants.correctClueNames.forEach((value: string, index: number) => clueChoices.push([value, index.toString()]))
        this.command = new SlashCommandBuilder()
            .setName(this.name)
            .setDescription(this.shortDescription)
        this.command.addStringOption(option => 
                option
                    .setName("first_clue")
                    .setDescription("First clue")
                    .setRequired(true)
                    .addChoices(clueChoices)
            )
            .addStringOption(option => 
                option
                    .setName("second_clue")
                    .setDescription("Second clue")
                    .setRequired(true)
                    .addChoices(clueChoices)
            )
            .addStringOption(option => 
                option
                    .setName("third_clue")
                    .setDescription("Third clue")
                    .setRequired(true)
                    .addChoices(clueChoices)
            )
    };
    filterGhosts(cluesCodes: number[]): Map<string, number[]> {
        const ghostPool = new Map(this.constants.ghosts);
        for (const clue of cluesCodes) {
            ghostPool.forEach((evidence: number[], ghost: string) => {
                if (evidence.includes(clue)) {
                    ghostPool.set(ghost, evidence.filter((x) => {return x != clue;}));
                } else ghostPool.delete(ghost);
            });
        }
        return ghostPool;
    };
    execute = async (interaction: CommandInteraction) => {
        const first = interaction.options.getString("first_clue")
        const second = interaction.options.getString("second_clue")
        const third = interaction.options.getString("third_clue")
        let availableClues: number[] = []
        if (first != "-1")
            availableClues.push(parseInt(first!))
        if (second != "-1")
            availableClues.push(parseInt(second!))
        if (third != "-1")
            availableClues.push(parseInt(third!))
        const ghostPool = this.filterGhosts(availableClues);
        const poolSize=ghostPool.size;
        if (poolSize == 0)
            interaction.reply(utils.errorMessageBuilder('No ghost matches those evidence'));
        else if (poolSize == 1)
            interaction.reply(`The ghost is a **${ghostPool.keys().next().value}**`);
        else {
            let msg = '';
            ghostPool.forEach((evidence: number[], ghost: string) => {
                const self = this;
                let line = `**${ghost}**: ${evidence.map((x:number) => {
                    return self.constants.correctClueNames[x];
                }).join(', ')}\n`;
                msg += line;
            });
            interaction.reply(msg.slice(0, -1));
        }
    };
};
