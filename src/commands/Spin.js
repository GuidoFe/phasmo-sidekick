const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const {MessageEmbed} = require('discord.js');
class Spin extends PrefixCommand {
    static ERR_CHALLENGE_NOT_VALID = 1;
    constructor(dataManager) {
        super('spin');
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
        this.commandUsage = `🌀 ${this.prefix} spin \`challenge_name\``;
        this.shortDescription = `Spin the wheel of the challenge \`challenge_name\`, if it has one.`;
        this.longDescription = this.shortDescription;
    };
    execute(message) {
        const args = utils.getMessageArguments(message);
        if (args[2]) {
            const challengeCode = args[2];
            const challenge = this.dataManager.challengesList[challengeCode];
            if (challenge && challenge['hasWheel'] && challenge['wheel']) {
                const wheel = challenge['wheel'];
                let trait='ERR';
                let description='';
                if (challenge['hasDuplicates']) {
                    trait = utils.pickRandom(challenge.pool);
                    description = wheel[trait]['desc'];
                } else {
                    trait = utils.pickRandom(Object.keys(wheel));
                    description = wheel[trait];
                }
                message.reply({embeds: [new MessageEmbed()
                    .setColor(utils.randomVibrantColor())
                    .setTitle(trait)
                    .setDescription(description)]});
                return 0;
            } else {
                let msg = `Error: ${challengeCode} is not a valid challenge. Valid challenges:\n`;
                msg += utils.buildChallengeList(this.dataManager.spinnableChallenges, this.dataManager.challengesList);
                message.reply(utils.errorMessageBuilder(msg));
                return Spin.ERR_CHALLENGE_NOT_VALID;
            }
        } else {
            let msg = 'Possible challenges:\n';
            msg += utils.buildChallengeList(this.dataManager.spinnableChallenges, this.dataManager.challengesList);
            message.reply(msg);
            return 0;
        }
    };
};
module.exports = Spin;
