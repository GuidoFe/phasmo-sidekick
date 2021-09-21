const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const challenge = new PrefixCommand('challenge');
const PREFIX = constants.prefix;

challenge.shortDescription = `⚔️ \`${PREFIX} challenge\`: pick a random challenge.`;
challenge.longDescription = `${challenge.shortDescription} List all possible challenges with \`${PREFIX} challenge list\`. Get a challenge description with \`${PREFIX} challenge CHALLENGE_NAME\``;

challenge.setCommand((message) => {
    const args = utils.getMessageArguments(message);
    if (args.length > 2) {
        if (args[2] == 'list') {
            message.reply(`For more info about a particular challenge, use the command \`${PREFIX} challenge CODE\`\n${utils.buildChallengeList(Object.keys(constants.challenges), constants.challenges)}`);
        } else {
            const challenge = constants.challenges[args[2]];
            if (challenge) {
                message.reply(`**${challenge['name']}**: ${challenge['desc']}`);
            } else {
                let msg = `${args[2]} is not a valid challenge.\nPossible challenges:\n`;
                msg += utils.buildChallengeList(Object.keys(constants.challenges), constants.challenges);
                message.reply(utils.errorMessageBuilder(msg));
            }
        }
    } else {
        const challenge = constants.challenges[utils.pickRandom(Object.keys(constants.challenges))];
        message.reply(`**${challenge['name']}**: ${challenge['desc']}`);
    }
});

module.exports = challenge;
