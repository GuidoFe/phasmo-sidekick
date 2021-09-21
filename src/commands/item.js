const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const item = new PrefixCommand('item');

item.shortDescription = `🔦 \`${constants.prefix} item\`: pick a random item`;
item.longDescription = item.shortDescription;

item.setCommand((message) => {
    message.reply(utils.pickRandom(constants.items));
});

module.exports = item;
