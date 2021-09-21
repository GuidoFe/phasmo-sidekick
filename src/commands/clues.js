const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const clues = new PrefixCommand('clues');

clues.shortDescription = `🔎\`${constants.prefix} clues CLUES\`: Show which ghosts are possible with those clues and which evidence is lacking.`;
clues.longDescription = `${clues.shortDescription} Clues:\n    - \`emf\` or \`emf5\`\n    - \`book\` or \`writing\` or \`ghostwriting\`\n    - \`fingerprints\` or \`fingers\`\n    - \`spirit\` or \`spiritbox\`\n    - \`orbs\` or \`ghostorbs\`\n    - \`freezing\` or \`temps\`\n    - \`dots\``;

clues.setCommand((message) => {
    const args = utils.getMessageArguments(message);
    let cluesList = [];
    if (args.length > 2) {
        cluesList = args.splice(2);
    }
    const wrongArgs = [];
    for (clue of cluesList) {
        if (!(clue in constants.commonClueNames)) {
            wrongArgs.push(clue);
        }
    }
    if (wrongArgs.length != 0) {
        if (wrongArgs.length == 1) {
            message.reply(utils.errorMessageBuilder(`${wrongArgs[0]} is not a valid clue`));
        } else {
            let stringWrongArgs = '';
            for (wrongArg of wrongArgs) {
                stringWrongArgs += wrongArg + ', ';
            }
            stringWrongArgs = stringWrongArgs.slice(0, -2);
            stringWrongArgs += ' are not valid evidence.\n\n' + constants.help['clues'];
            message.reply(utils.errorMessageBuilder(stringWrongArgs));
        }
    } else {
        ghostPool = {};
        for (const [ghost, evidence] of Object.entries(constants.ghosts)) {
            ghostPool[ghost] = evidence.slice();
        }
        const availableClues = cluesList.map((x) => {
            return constants.commonClueNames[x];
        });
        for (const clue of availableClues) {
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
        poolLen=Object.keys(ghostPool).length;
        if (poolLen == 0) {
            message.reply(utils.errorMessageBuilder('No ghost matches those evidence'));
        } else if (poolLen == 1) {
            message.reply(`The ghost is a **${Object.keys(ghostPool)[0]}**`);
        } else {
            let msg = '';
            for (const [ghost, evidence] of Object.entries(ghostPool)) {
                let line = `**${ghost}**: `;
                for (const i of evidence) {
                    line += ' ' + constants.correctClueNames[i] + ',';
                }
                line = line.slice(0, -1);
                msg += line + '\n';
            }
            message.reply(msg.slice(0, -1));
        }
    }
});

module.exports = clues;
