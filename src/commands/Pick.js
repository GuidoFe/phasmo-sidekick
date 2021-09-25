const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');

class Pick extends PrefixCommand {
    static ERR_NO_ARGS = 1;
    constructor(dataManager) {
        super('pick');
        this.prefix = dataManager.constants.prefix;
        this.commandUsage = `🎲 ${this.prefix} pick \`A B C ...\``;
        this.shortDescription = `Pick a random element from the specified list. Useful when deciding who should talk with the ghost alone.`;
        this.longDescription = `${this.shortDescription} Example: \`${this.prefix} pick Georgina Darlene Martin\``;
        this.dataManager = dataManager;
    }
    execute(message) {
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            const pool = args.slice(2);
            message.reply(utils.pickRandom(pool));
            return 0;
        } else {
            message.reply(utils.errorMessageBuilder(this.longDescription));
            return Pick.ERR_NO_ARGS;
        }
    };
};
module.exports = Pick;
