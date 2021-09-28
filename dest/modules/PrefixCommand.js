/** Test */
var PrefixCommand = /** @class */ (function () {
    function PrefixCommand(name) {
        this.commandUsage = '';
        this.shortDescription = '';
        this.longDescription = '';
        this.name = name;
    }
    PrefixCommand.prototype.execute = function () { };
    ;
    PrefixCommand.prototype.setCommand = function (command) {
        this.execute = command;
    };
    return PrefixCommand;
}());
module.exports = PrefixCommand;
