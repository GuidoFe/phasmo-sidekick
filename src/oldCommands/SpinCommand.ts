import {PrefixCommand, DataManager} from '@modules';
import utils = require('@utils');
import {MessageEmbed, Message} from 'discord.js';
export class SpinCommand extends PrefixCommand {
    static ERR_CHALLENGE_NOT_VALID = 1;
    name = 'spin';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.dataManager = dataManager;
        this.commandUsage = `🌀 ${this.prefix} spin \`challenge_name\``;
        this.shortDescription = `Spin the wheel of the challenge \`challenge_name\`, if it has one.`;
        this.longDescription = this.shortDescription;
    };
    execute(message: Message) {
        const args = utils.getMessageArguments(message);
        if (args[2] != null) {
            const challengeCode = args[2];
            const challenge = this.dataManager.challengesList.get(challengeCode);
            if (challenge != null && challenge.hasWheel && challenge.wheel) {
                const wheel = challenge.wheel;
                let trait='ERR';
                let description='';
                if (challenge.hasDuplicates) {
                    trait = utils.pickRandom(challenge.pool);
                    description = wheel.get(trait)!.desc;
                } else {
                    trait = utils.pickRandom(Array.from(wheel.keys()));
                    description = wheel.get(trait)!.desc;
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
                return SpinCommand.ERR_CHALLENGE_NOT_VALID;
            }
        } else {
            let msg = 'Possible challenges:\n';
            msg += utils.buildChallengeList(this.dataManager.spinnableChallenges, this.dataManager.challengesList);
            message.reply(msg);
            return 0;
        }
    };
};
