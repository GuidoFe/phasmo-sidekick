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
var Pick = /** @class */ (function (_super) {
    __extends(Pick, _super);
    function Pick(dataManager) {
        var _this = _super.call(this, 'pick') || this;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\uD83C\uDFB2 " + _this.prefix + " pick `A B C ...`";
        _this.shortDescription = "Pick a random element from the specified list. Useful when deciding who should talk with the ghost alone.";
        _this.longDescription = _this.shortDescription + " Example: `" + _this.prefix + " pick Georgina Darlene Martin`";
        _this.dataManager = dataManager;
        return _this;
    }
    Pick.prototype.execute = function (message) {
        var args = utils.getMessageArguments(message);
        if (args.length > 2) {
            var pool = args.slice(2);
            message.reply(utils.pickRandom(pool));
            return 0;
        }
        else {
            message.reply(utils.errorMessageBuilder(this.longDescription));
            return Pick.ERR_NO_ARGS;
        }
    };
    ;
    Pick.ERR_NO_ARGS = 1;
    return Pick;
}(PrefixCommand));
;
module.exports = Pick;
