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
var Clues = /** @class */ (function (_super) {
    __extends(Clues, _super);
    function Clues(dataManager) {
        var _this = _super.call(this, 'clues') || this;
        _this.dataManager = dataManager;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\uD83D\uDD0E " + _this.prefix + " clues `clues_list`";
        _this.shortDescription = "Show which ghosts are possible with those clues and which evidence is lacking.";
        _this.longDescription = _this.shortDescription + " Clues:\n    - `emf` or `emf5`\n    - `book` or `writing` or `ghostwriting`\n    - `fingerprints` or `fingers`\n    - `spirit` or `spiritbox`\n    - `orbs` or `ghostorbs`\n    - `freezing` or `temps`\n    - `dots`\n\nExample: `" + _this.prefix + " clues emf orbs`";
        return _this;
    }
    Clues.prototype.filterGhosts = function (cluesCodes) {
        var ghostPool = {};
        for (var _i = 0, _a = Object.entries(this.dataManager.constants.ghosts); _i < _a.length; _i++) {
            var _b = _a[_i], ghost = _b[0], evidence = _b[1];
            // Slice is used to make a copy of the array evidence
            ghostPool[ghost] = evidence.slice();
        }
        var _loop_1 = function (clue) {
            for (var _d = 0, _e = Object.entries(ghostPool); _d < _e.length; _d++) {
                var _f = _e[_d], ghost = _f[0], evidence = _f[1];
                if (evidence.includes(clue)) {
                    ghostPool[ghost] = evidence.filter(function (x) {
                        return x != clue;
                    });
                }
                else {
                    delete ghostPool[ghost];
                }
            }
        };
        for (var _c = 0, cluesCodes_1 = cluesCodes; _c < cluesCodes_1.length; _c++) {
            var clue = cluesCodes_1[_c];
            _loop_1(clue);
        }
        return ghostPool;
    };
    ;
    Clues.prototype.execute = function (message) {
        var _this = this;
        var args = utils.getMessageArguments(message);
        var cluesList = [];
        if (args.length > 2) {
            cluesList = args.splice(2);
        }
        var wrongArgs = [];
        for (var _i = 0, cluesList_1 = cluesList; _i < cluesList_1.length; _i++) {
            var clue = cluesList_1[_i];
            if (!(clue in this.dataManager.constants.commonClueNames)) {
                wrongArgs.push(clue);
            }
        }
        if (wrongArgs.length != 0) {
            if (wrongArgs.length == 1) {
                message.reply(utils.errorMessageBuilder(wrongArgs[0] + " is not a valid clue"));
                return Clues.ERR_CLUE_NOT_VALID;
            }
            else {
                var stringWrongArgs = '';
                for (var _a = 0, wrongArgs_1 = wrongArgs; _a < wrongArgs_1.length; _a++) {
                    var wrongArg = wrongArgs_1[_a];
                    stringWrongArgs += wrongArg + ', ';
                }
                stringWrongArgs = stringWrongArgs.slice(0, -2);
                stringWrongArgs += ' are not valid evidence.\n\n' + this.longDescription;
                message.reply(utils.errorMessageBuilder(stringWrongArgs));
                return Clues.ERR_CLUE_NOT_VALID;
            }
        }
        else {
            var availableClues = cluesList.map(function (x) {
                return _this.dataManager.constants.commonClueNames[x];
            });
            var ghostPool = this.filterGhosts(availableClues);
            var poolLen = Object.keys(ghostPool).length;
            if (poolLen == 0) {
                message.reply(utils.errorMessageBuilder('No ghost matches those evidence'));
                return 0;
            }
            else if (poolLen == 1) {
                message.reply("The ghost is a **" + Object.keys(ghostPool)[0] + "**");
                return 0;
            }
            else {
                var msg = '';
                for (var _b = 0, _c = Object.entries(ghostPool); _b < _c.length; _b++) {
                    var _d = _c[_b], ghost = _d[0], evidence = _d[1];
                    var line = "**" + ghost + "**: ";
                    for (var _e = 0, evidence_1 = evidence; _e < evidence_1.length; _e++) {
                        var i = evidence_1[_e];
                        line += ' ' + this.dataManager.constants.correctClueNames[i] + ',';
                    }
                    line = line.slice(0, -1);
                    msg += line + '\n';
                }
                message.reply(msg.slice(0, -1));
                return 0;
            }
        }
    };
    ;
    Clues.ERR_CLUE_NOT_VALID = 1;
    return Clues;
}(PrefixCommand));
;
module.exports = Clues;
