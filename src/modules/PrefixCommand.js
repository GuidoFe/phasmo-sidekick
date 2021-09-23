/** Test */
class PrefixCommand {
    execute() {};
    name;
    shortDescription = '';
    longDescription = '';
    constructor(name) {
        this.name = name;
    }
    setCommand(command) {
        this.execute = command;
    }
}
module.exports = PrefixCommand;
