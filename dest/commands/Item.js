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
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item(dataManager) {
        var _this = _super.call(this, 'item') || this;
        _this.dataManager = dataManager;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\uD83D\uDD26 " + _this.prefix + " item";
        _this.shortDescription = "Pick a random item";
        _this.longDescription = _this.shortDescription;
        return _this;
    }
    ;
    Item.prototype.execute = function (message) {
        message.reply(utils.pickRandom(this.dataManager.constants.items));
        return 0;
    };
    ;
    return Item;
}(PrefixCommand));
;
module.exports = Item;
