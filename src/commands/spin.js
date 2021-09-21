const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const spin = new PrefixCommand('spin');
const {MessageEmbed} = require('discord.js');

spin.shortDescription = `🌀\`${constants.prefix} spin CHALLENGE_NAME\`: spin the wheel of the challenge CHALLENGE_NAME, if it has one.`;
spin.longDescription = spin.shortDescription;

spin.setCommand((message) => {
    const args = utils.getMessageArguments(message);
    if (args[2]) {
        const challengeCode = args[2];
        const challenge = constants.challenges[challengeCode];
        if (challenge && challenge['hasWheel'] && challenge['wheel']) {
            const wheel = challenge['wheel'];
            let trait='ERR';
            let description='';
            if (challenge['hasDuplicates']) {
                const pool = [];
                for (const [traitName, traitObj] of Object.entries(wheel)) {
                    for (i=0; i < traitObj['n']; i++) {
                        pool.push(traitName);
                    }
                }
                trait = utils.pickRandom(pool);
                description = wheel[trait]['desc'];
            } else {
                trait = utils.pickRandom(Object.keys(wheel));
                description = wheel[trait];
            }
            message.reply({embeds: [new MessageEmbed()
                .setColor(utils.randomVibrantColor())
                .setTitle(trait)
                .setDescription(description)]});
        } else {
            let msg = `Error: ${challengeCode} is not a valid challenge. Valid challenges:\n`;
            msg += utils.buildChallengeList(constants.spinnableChallenges, constants.challenges);
            message.reply(utils.errorMessageBuilder(msg));
        }
    } else {
        let msg = 'Possible challenges:\n';
        msg += utils.buildChallengeList(constants.spinnableChallenges, constants.challenges);
        message.reply(msg);
    }
});

module.exports = spin;
