import {PrefixCommand, DataManager} from '@modules';
import {Message} from 'discord.js';
import utils = require('@utils');
export class MapCommand extends PrefixCommand {
    static ERR_MAP_NOT_VALID = 1;
    name = 'map';
    constructor(dataManager: DataManager) {
        super(dataManager);
        this.dataManager = dataManager;
        const symbol = '🗺️';
        this.commandUsage = `${symbol} ${this.prefix} map \`available_maps\``;
        this.shortDescription = `Choose a random map between those indicated.`;
        this.longDescription = `${this.shortDescription} If \`available_maps\` is empty, it will consider every map. \`available_maps\` is a sequence of these letters separated by spaces:\n    - t: Tanglewood\n    - e: Edgefield\n    - w: Willow\n    - r: Ridgeview\n    - g: Grafton\n    - b: Bleasdale\n    - h: Brownstone Highschool\n    - p: Prison\n    - a: Asylum`;
    };
    pickMap(mapsInitialsPool: string[] | undefined = undefined) : string {
        if (mapsInitialsPool != null && mapsInitialsPool.length > 0) {
            const mapInitial = utils.pickRandom(mapsInitialsPool);
            const res = this.dataManager.constants.maps.get(mapInitial);
            if (res != null) {
                return res;
            }
            else {
                throw `Error: Map initial ${mapInitial} is not valid and it wasn't filtered out`;
            }
        } else {
            return utils.pickRandom(Array.from(this.dataManager.constants.maps.values()));
        };
    };
    execute(message: Message): number {
        const args = utils.getMessageArguments(message);
        if (args.length > 2) {
            const mapsInitialsPool = args.splice(2);
            for (const mapInitial of mapsInitialsPool) {
                if (!(this.dataManager.constants.maps.has(mapInitial))) {
                    message.reply(utils.errorMessageBuilder(`${mapInitial} is not a valid map.`));
                    return MapCommand.ERR_MAP_NOT_VALID;
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
