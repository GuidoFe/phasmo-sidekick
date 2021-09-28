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
var Help = /** @class */ (function (_super) {
    __extends(Help, _super);
    function Help(dataManager) {
        var _this = _super.call(this, 'help') || this;
        _this.dataManager = dataManager;
        _this.prefix = dataManager.constants.prefix;
        _this.commandUsage = "\u2753 " + _this.prefix + " help `command`";
        _this.shortDescription = 'General help message, or help about `command` if you specify it.';
        _this.longDescription = _this.shortDescription;
        _this.embedFullHelpMessage = new MessageEmbed().addField(_this.commandUsage, _this.shortDescription);
        _this.embedFullHelpMessage.setTitle('Commands');
        _this.commandList = { 'help': {} };
        return _this;
    }
    Help.prototype.init = function (commands) {
        for (var _i = 0, _a = Object.entries(commands); _i < _a.length; _i++) {
            var _b = _a[_i], commandName = _b[0], command = _b[1];
            this.commandList[commandName] = {
                shortDescription: command.shortDescription,
                longDescription: command.longDescription,
                commandUsage: command.commandUsage,
            };
            if (commandName != 'help') {
                this.embedFullHelpMessage.addField(command.commandUsage, command.shortDescription);
            }
            ;
        }
        ;
    };
    ;
    Help.prototype.execute = function (message) {
        var args = utils.getMessageArguments(message);
        if (args.length > 2 && !(args[2] in this.commandList)) {
            message.reply(utils.errorMessageBuilder(args[2] + " is not a valid command."));
            return Help.ERR_COMMAND_NOT_VALID;
        }
        if (args.length <= 2) {
            message.reply({ embeds: [this.embedFullHelpMessage] });
        }
        else {
            var embed = new MessageEmbed();
            embed.setTitle("Help for " + args[2]);
            var seekedCommand = this.commandList[args[2]];
            embed.addField(seekedCommand.commandUsage, seekedCommand.longDescription);
            message.reply({ embeds: [embed] });
        }
        return 0;
    };
    ;
    Help.ERR_COMMAND_NOT_VALID = 1;
    return Help;
}(PrefixCommand));
module.exports = Help;
