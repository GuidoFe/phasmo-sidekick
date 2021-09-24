const PrefixCommand = require('@modules/PrefixCommand');
const utils = require('@utils');
class Map extends PrefixCommand {
    static ERR_MAP_NOT_VALID = 1;
    constructor(dataManager) {
        super('map');
        this.dataManager = dataManager;
        this.prefix = dataManager.constants.prefix;
        const symbol = '🗺️';
        this.shortDescription = `${symbol} \`${this.prefix} map LIST\`: choose a random map between those indicated.`;
        this.longDescription = `${this.shortDescription} If List is empty, it will consider every map. List is a sequence of these letters separated by spaces:\n    - t: Tanglewood\n    - e: Edgefield\n    - w: Willow\n    - r: Ridgeview\n    - g: Grafton\n    - b: Bleasdale\n    - h: Brownstone Highschool\n    - p: Prison\n    - a: Asylum`;
    };
    pickMap(mapsInitialsPool) {
        if (mapsInitialsPool && mapsInitialsPool.length > 0) {
            return this.dataManager.constants.maps[utils.pickRandom(mapsInitialsPool)];
        } else {
            return utils.pickRandom(Object.values(this.dataManager.constants.maps));
        };
    };
    execute(message) {
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            const mapsInitialsPool = args.splice(2);
            for (const mapInitial of mapsInitialsPool) {
                if (!(mapInitial in this.dataManager.constants.maps)) {
                    message.reply(utils.errorMessageBuilder(`${mapInitial} is not a valid map.`));
                    return Map.ERR_MAP_NOT_VALID;
                }
            }
            message.reply(this.pickMap(mapsInitialsPool));
            return 0;
        } else {
            message.reply(this.pickMap());
            return 0;
        };
    };
};
module.exports = Map;
