const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');

class Clues extends PrefixCommand {
    static ERR_CLUE_NOT_VALID = 1;
    constructor(dataManager) {
        super('clues');
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
        this.commandUsage = `🔎 ${this.prefix} clues \`clues_list\``;
        this.shortDescription = `Show which ghosts are possible with those clues and which evidence is lacking.`;
        this.longDescription = `${this.shortDescription} Clues:\n    - \`emf\` or \`emf5\`\n    - \`book\` or \`writing\` or \`ghostwriting\`\n    - \`fingerprints\` or \`fingers\`\n    - \`spirit\` or \`spiritbox\`\n    - \`orbs\` or \`ghostorbs\`\n    - \`freezing\` or \`temps\`\n    - \`dots\`\n\nExample: \`${this.prefix} clues emf orbs\``;
    }
    filterGhosts(cluesCodes) {
        const ghostPool = {};
        for (const [ghost, evidence] of Object.entries(this.dataManager.constants.ghosts)) {
            // Slice is used to make a copy of the array evidence
            ghostPool[ghost] = evidence.slice();
        }
        for (const clue of cluesCodes) {
            for (const [ghost, evidence] of Object.entries(ghostPool)) {
                if (evidence.includes(clue)) {
                    ghostPool[ghost] = evidence.filter((x) => {
                        return x != clue;
                    });
                } else {
                    delete ghostPool[ghost];
                }
            }
        }
        return ghostPool;
    };
    execute(message) {
        const args = utils.getMessageArguments(message);
        let cluesList = [];
        if (args.length > 2) {
            cluesList = args.splice(2);
        }
        const wrongArgs = [];
        for (const clue of cluesList) {
            if (!(clue in this.dataManager.constants.commonClueNames)) {
                wrongArgs.push(clue);
            }
        }
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue`));
                return Clues.ERR_CLUE_NOT_VALID;
            } else {
                let stringWrongArgs = '';
                for (const wrongArg of wrongArgs) {
                    stringWrongArgs += wrongArg + ', ';
                }
                stringWrongArgs = stringWrongArgs.slice(0, -2);
                stringWrongArgs += ' are not valid evidence.\n\n' + this.longDescription;
                message.reply(utils.errorMessageBuilder(stringWrongArgs));
                return Clues.ERR_CLUE_NOT_VALID;
            }
        } else {
            const availableClues = cluesList.map((x) => {
                return this.dataManager.constants.commonClueNames[x];
            });
            const ghostPool = this.filterGhosts(availableClues);
            const poolLen=Object.keys(ghostPool).length;
            if (poolLen == 0) {
                message.reply(utils.errorMessageBuilder('No ghost matches those evidence'));
                return 0;
            } else if (poolLen == 1) {
                message.reply(`The ghost is a **${Object.keys(ghostPool)[0]}**`);
                return 0;
            } else {
                let msg = '';
                for (const [ghost, evidence] of Object.entries(ghostPool)) {
                    let line = `**${ghost}**: `;
                    for (const i of evidence) {
                        line += ' ' + this.dataManager.constants.correctClueNames[i] + ',';
                    }
                    line = line.slice(0, -1);
                    msg += line + '\n';
                }
                message.reply(msg.slice(0, -1));
                return 0;
            }
        }
    };
};
module.exports = Clues;
