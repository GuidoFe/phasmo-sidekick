import {PrefixCommand, DataManager} from '@modules';
import  utils = require('@utils');
import {Message} from 'discord.js';

export class ChallengeCommand extends PrefixCommand {
    static ERR_CHALLENGE_NOT_VALID = 1;
    name = 'challenge';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.commandUsage = `⚔️ ${this.prefix} challenge`;
        this.shortDescription = 'Pick a random challenge created by the Phasmophobia community. Add `list` at the end to list all the possible challenges.';
        this.longDescription = `${this.shortDescription} Get a challenge description with ${this.prefix} challenge \`challenge_name\``;
    }
    execute(message:Message): number {
        const challenges = this.dataManager.challengesList;
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            if (args[2] == 'list') {
                message.reply(`For more info about a particular challenge, use the command \`${this.prefix} challenge CODE\`\n${utils.buildChallengeList(Array.from(challenges.keys()), challenges)}`);
                return 0;
            } else {
                const pickedChallenge = challenges.get(args[2]);
                if (pickedChallenge != null) {
                    message.reply(`**${pickedChallenge['name']}**: ${pickedChallenge['desc']}`);
                    return 0;
                } else {
                    let msg = `${args[2]} is not a valid challenge.\nPossible challenges:\n`;
                    msg += utils.buildChallengeList(Array.from(challenges.keys()), challenges);
                    message.reply(utils.errorMessageBuilder(msg));
                    return ChallengeCommand.ERR_CHALLENGE_NOT_VALID;
                }
            }
        } else {
            const randomChallenge = challenges.get(utils.pickRandom(Array.from(challenges.keys())));
            message.reply(`**${randomChallenge!.name}**: ${randomChallenge!.desc}`);
            return 0;
        }
    };
};
