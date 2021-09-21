const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
const constants = require('@constants');
const map = new PrefixCommand('map');

map.shortDescription = `🗺️  \`${constants.prefix} map LIST\`: choose a random map between those indicated.`;
map.longDescription = `${map.shortDescription} If List is empty, it will consider every map. List is a sequence of these letters separated by spaces:\n    - t: Tanglewood\n    - e: Edgefield\n    - w: Willow\n    - r: Ridgeview\n    - g: Grafton\n    - b: Bleasdale\n    - h: Brownstone Highschool\n    - p: Prison\n    - a: Asylum`;

map.setCommand((message) => {
    const args = utils.getMessageArguments(message);
    if (args.length > 2) {
        mapsInitialsPool = args.splice(2);
        for (mapInitial of mapsInitialsPool) {
            if (!(mapInitial in constants.maps)) {
                message.reply(utils.errorMessageBuilder(`${mapInitial} is not a valid map.`));
                return;
            }
        }
        message.reply(constants.maps[utils.pickRandom(mapsInitialsPool)]);
    } else {
        message.reply(utils.pickRandom(Object.values(constants.maps)));
    };
});

module.exports = map;
