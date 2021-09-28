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
var MessageEmbed = require('discord.js').MessageEmbed;
var Spin = /** @class */ (function (_super) {
    __extends(Spin, _super);
    function Spin(dataManager) {
        var _this = _super.call(this, 'spin') || this;
        _this.dataManager = dataManager;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\uD83C\uDF00 " + _this.prefix + " spin `challenge_name`";
        _this.shortDescription = "Spin the wheel of the challenge `challenge_name`, if it has one.";
        _this.longDescription = _this.shortDescription;
        return _this;
    }
    ;
    Spin.prototype.execute = function (message) {
        var args = utils.getMessageArguments(message);
        if (args[2]) {
            var challengeCode = args[2];
            var challenge = this.dataManager.challengesList[challengeCode];
            if (challenge && challenge['hasWheel'] && challenge['wheel']) {
                var wheel = challenge['wheel'];
                var trait = 'ERR';
                var description = '';
                if (challenge['hasDuplicates']) {
                    trait = utils.pickRandom(challenge.pool);
                    description = wheel[trait]['desc'];
                }
                else {
                    trait = utils.pickRandom(Object.keys(wheel));
                    description = wheel[trait];
                }
                message.reply({ embeds: [new MessageEmbed()
                            .setColor(utils.randomVibrantColor())
                            .setTitle(trait)
                            .setDescription(description)] });
                return 0;
            }
            else {
                var msg = "Error: " + challengeCode + " is not a valid challenge. Valid challenges:\n";
                msg += utils.buildChallengeList(this.dataManager.spinnableChallenges, this.dataManager.challengesList);
                message.reply(utils.errorMessageBuilder(msg));
                return Spin.ERR_CHALLENGE_NOT_VALID;
            }
        }
        else {
            var msg = 'Possible challenges:\n';
            msg += utils.buildChallengeList(this.dataManager.spinnableChallenges, this.dataManager.challengesList);
            message.reply(msg);
            return 0;
        }
    };
    ;
    Spin.ERR_CHALLENGE_NOT_VALID = 1;
    return Spin;
}(PrefixCommand));
;
module.exports = Spin;
