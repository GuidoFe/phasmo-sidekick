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
var Challenge = /** @class */ (function (_super) {
    __extends(Challenge, _super);
    function Challenge(dataManager) {
        var _this = _super.call(this, 'challenge') || this;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\u2694\uFE0F " + _this.prefix + " challenge";
        _this.shortDescription = 'Pick a random challenge. Add `list` at the end to list all the possible challenges.';
        _this.longDescription = _this.shortDescription + " Get a challenge description with " + _this.prefix + " challenge `challenge_name`";
        _this.dataManager = dataManager;
        return _this;
    }
    Challenge.prototype.execute = function (message) {
        var challenges = this.dataManager.challengesList;
        var args = utils.getMessageArguments(message);
        if (args.length > 2) {
            if (args[2] == 'list') {
                message.reply("For more info about a particular challenge, use the command `" + this.prefix + " challenge CODE`\n" + utils.buildChallengeList(Object.keys(challenges), challenges));
                return 0;
            }
            else {
                var pickedChallenge = challenges[args[2]];
                if (pickedChallenge) {
                    message.reply("**" + pickedChallenge['name'] + "**: " + pickedChallenge['desc']);
                    return 0;
                }
                else {
                    var msg = args[2] + " is not a valid challenge.\nPossible challenges:\n";
                    msg += utils.buildChallengeList(Object.keys(challenges), challenges);
                    message.reply(utils.errorMessageBuilder(msg));
                    return Challenge.ERR_CHALLENGE_NOT_VALID;
                }
            }
        }
        else {
            var randomChallenge = challenges[utils.pickRandom(Object.keys(challenges))];
            message.reply("**" + randomChallenge['name'] + "**: " + randomChallenge['desc']);
            return 0;
        }
    };
    ;
    Challenge.ERR_CHALLENGE_NOT_VALID = 1;
    return Challenge;
}(PrefixCommand));
;
module.exports = Challenge;
