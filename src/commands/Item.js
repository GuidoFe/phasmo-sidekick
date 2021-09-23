const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
class Item extends PrefixCommand {
    constructor(dataManager) {
        super('item');
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
        this.shortDescription = `🔦 \`${this.prefix} item\`: pick a random item`;
        this.longDescription = this.shortDescription;
    };
    execute(message) {
        message.reply(utils.pickRandom(this.dataManager.constants.items));
        return 0;
    };
};
module.exports = Item;
