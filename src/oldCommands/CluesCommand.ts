import {Constants, PrefixCommand, DataManager} from '@modules';
import utils = require('@utils');
import {Message} from 'discord.js';

export class CluesCommand extends PrefixCommand {
    static ERR_CLUE_NOT_VALID = 1;
    name = 'clues';
    constants:Constants;
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.constants = dataManager.constants;
        this.commandUsage = `🔎 ${this.prefix} clues \`clues_list OR ghost_name\``;
        this.shortDescription = `Show which ghosts are possible with those clues and which evidence is lacking. Altenatively, you can list the clues of a particular ghost by specifying its name.`;
        this.longDescription = `${this.shortDescription}\n Examples: \n- \`${this.prefix} clues book dots\` to list all the ghosts that have ghost writing and dots.\n- \`${this.prefix} clues oni\` to list all the evidence of the oni.\nClues:\n    - \`emf\` or \`emf5\`\n    - \`book\` or \`writing\` or \`ghostwriting\`\n    - \`fingerprints\` or \`fingers\`\n    - \`spirit\` or \`spiritbox\`\n    - \`orbs\` or \`ghostorbs\`\n    - \`freezing\` or \`temps\`\n    - \`dots\`\n\nExample: \`${this.prefix} clues emf orbs\``;
    }
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
    execute(message: Message): number {
        var args = utils.getMessageArguments(message);
        let cluesList = new Array<string>();
        if (args.length == 4 && args[2].toLowerCase() == "the" && args[3].toLowerCase() == "twins" || args.length == 3 && args[2].toLowerCase() == "twins") {
            args = ["!ph", "clues", "The Twins"]
        }
        if (args.length > 2) {
            cluesList = args.slice(2);
        }
        if (args.length == 3) {
            var ghostName = args[2]
            if (args[2] != "The Twins") {
                ghostName = args[2].charAt(0).toUpperCase() + args[2].slice(1).toLowerCase();
            }
            if (this.constants.ghosts.has(ghostName)) {
                const self = this;
                const clues = this.constants.ghosts.get(ghostName)!.map(function (x: number) {
                    return self.constants.correctClueNames[x];
                });
                message.reply(clues.join(', '));
                return 0;
            }
        }
        const wrongArgs = new Array<string>();
        for (const clue of cluesList) {
            if (!(this.constants.commonClueNames.has(clue))) {
                wrongArgs.push(clue);
            }
        }
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                if (args.length == 3) {
                    message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue or ghost name.`));
                } else {
                    message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue.`));
                }
                return CluesCommand.ERR_CLUE_NOT_VALID;
            } else {
                let stringWrongArgs = wrongArgs.join(', ');
                message.reply(utils.errorMessageBuilder(`${stringWrongArgs} are not valid evidence.\n\n${this.longDescription}`));
                return CluesCommand.ERR_CLUE_NOT_VALID;
            }
        } else {
            const availableClues = cluesList.map((x) => {
                const val = this.constants.commonClueNames.get(x);
                if (val != null) {
                    return val;
                } else {
                    throw `Error: clue ${x} in cluesList is not in availableClues`;
                };
            });
            const ghostPool = this.filterGhosts(availableClues);
            const poolSize=ghostPool.size;
            if (poolSize == 0) {
                message.reply(utils.errorMessageBuilder('No ghost matches those evidence'));
                return 0;
            } else if (poolSize == 1) {
                message.reply(`The ghost is a **${ghostPool.keys().next().value}**`);
                return 0;
            } else {
                let msg = '';
                ghostPool.forEach((evidence: number[], ghost: string) => {
                    const self = this;
                    let line = `**${ghost}**: ${evidence.map((x:number) => {
                        return self.constants.correctClueNames[x];
                    }).join(', ')}\n`;
                    msg += line;
                });
                message.reply(msg.slice(0, -1));
                return 0;
            }
        }
    };
};
