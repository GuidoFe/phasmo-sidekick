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
        this.commandUsage = `🔎 ${this.prefix} clues \`clues_list\``;
        this.shortDescription = `Show which ghosts are possible with those clues and which evidence is lacking.`;
        this.longDescription = `${this.shortDescription} Clues:\n    - \`emf\` or \`emf5\`\n    - \`book\` or \`writing\` or \`ghostwriting\`\n    - \`fingerprints\` or \`fingers\`\n    - \`spirit\` or \`spiritbox\`\n    - \`orbs\` or \`ghostorbs\`\n    - \`freezing\` or \`temps\`\n    - \`dots\`\n\nExample: \`${this.prefix} clues emf orbs\``;
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
        const args = utils.getMessageArguments(message);
        let cluesList = new Array<string>();
        if (args.length > 2) {
            cluesList = args.splice(2);
        }
        const wrongArgs = new Array<string>();
        for (const clue of cluesList) {
            if (!(this.constants.commonClueNames.has(clue))) {
                wrongArgs.push(clue);
            }
        }
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue`));
                return CluesCommand.ERR_CLUE_NOT_VALID;
            } else {
                let stringWrongArgs = '';
                for (const wrongArg of wrongArgs) {
                    stringWrongArgs += wrongArg + ', ';
                }
                stringWrongArgs = stringWrongArgs.slice(0, -2);
                stringWrongArgs += ' are not valid evidence.\n\n' + this.longDescription;
                message.reply(utils.errorMessageBuilder(stringWrongArgs));
                return CluesCommand.ERR_CLUE_NOT_VALID;
            }
        } else {
            const availableClues = cluesList.map((x) => {
                const val = this.constants.commonClueNames.get(x);
                console.log(`x: ${x}\nval: ${val}`);
                console.log(this.constants.commonClueNames);
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
                    let line = `**${ghost}**: `;
                    for (const i of evidence) {
                        line += ' ' + this.constants.correctClueNames[i] + ',';
                    }
                    line = line.slice(0, -1);
                    msg += line + '\n';
                });
                message.reply(msg.slice(0, -1));
                return 0;
            }
        }
    };
};
