var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var PrefixCommand = require('@modules/PrefixCommand');
var utils = require('@utils');
var Map = /** @class */ (function (_super) {
    __extends(Map, _super);
    function Map(dataManager) {
        var _this = _super.call(this, 'map') || this;
        _this.dataManager = dataManager;
        _this.prefix = dataManager.constants.prefix;
        var symbol = '🗺️';
        _this.commandUsage = symbol + " " + _this.prefix + " map `available_maps`";
        _this.shortDescription = "Choose a random map between those indicated.";
        _this.longDescription = _this.shortDescription + " If `available_maps` is empty, it will consider every map. `available_maps` is a sequence of these letters separated by spaces:\n    - t: Tanglewood\n    - e: Edgefield\n    - w: Willow\n    - r: Ridgeview\n    - g: Grafton\n    - b: Bleasdale\n    - h: Brownstone Highschool\n    - p: Prison\n    - a: Asylum";
        return _this;
    }
    ;
    Map.prototype.pickMap = function (mapsInitialsPool) {
        if (mapsInitialsPool && mapsInitialsPool.length > 0) {
            return this.dataManager.constants.maps[utils.pickRandom(mapsInitialsPool)];
        }
        else {
            return utils.pickRandom(Object.values(this.dataManager.constants.maps));
        }
        ;
    };
    ;
    Map.prototype.execute = function (message) {
        var args = utils.getMessageArguments(message);
        if (args.length > 2) {
            var mapsInitialsPool = args.splice(2);
            for (var _i = 0, mapsInitialsPool_1 = mapsInitialsPool; _i < mapsInitialsPool_1.length; _i++) {
                var mapInitial = mapsInitialsPool_1[_i];
                if (!(mapInitial in this.dataManager.constants.maps)) {
                    message.reply(utils.errorMessageBuilder(mapInitial + " is not a valid map."));
                    return Map.ERR_MAP_NOT_VALID;
                }
            }
            message.reply(this.pickMap(mapsInitialsPool));
            return 0;
        }
        else {
            message.reply(this.pickMap());
            return 0;
        }
        ;
    };
    ;
    Map.ERR_MAP_NOT_VALID = 1;
    return Map;
}(PrefixCommand));
;
module.exports = Map;
