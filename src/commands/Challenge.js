const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');

class Challenge extends PrefixCommand {
    static ERR_CHALLENGE_NOT_VALID = 1;
    constructor(dataManager) {
        super('challenge');
        this.prefix = dataManager.constants.prefix;
        this.shortDescription = `⚔️ \`${this.prefix} challenge\`: pick a random challenge. Add 'list' at the end to list all the possible challenges.`;
        this.longDescription = `${this.shortDescription} Get a challenge description with \`${this.prefix} challenge CHALLENGE_NAME\``;
        this.dataManager = dataManager;
    }
    execute(message) {
        const challenges = this.dataManager.challengesList;
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            if (args[2] == 'list') {
                message.reply(`For more info about a particular challenge, use the command \`${this.prefix} challenge CODE\`\n${utils.buildChallengeList(Object.keys(challenges), challenges)}`);
                return 0;
            } else {
                const pickedChallenge = challenges[args[2]];
                if (pickedChallenge) {
                    message.reply(`**${pickedChallenge['name']}**: ${pickedChallenge['desc']}`);
                    return 0;
                } else {
                    let msg = `${args[2]} is not a valid challenge.\nPossible challenges:\n`;
                    msg += utils.buildChallengeList(Object.keys(challenges), challenges);
                    message.reply(utils.errorMessageBuilder(msg));
                    return Challenge.ERR_CHALLENGE_NOT_VALID;
                }
            }
        } else {
            const randomChallenge = challenges[utils.pickRandom(Object.keys(challenges))];
            message.reply(`**${randomChallenge['name']}**: ${randomChallenge['desc']}`);
            return 0;
        }
    };
};
module.exports = Challenge;
