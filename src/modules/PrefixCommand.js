/** Test */
class PrefixCommand {
    execute() { throw 'Command not defined!' };
    name;
    shortDescription;
    longDescription;
    constructor (name) {
        this.name = name;
    }
    setCommand(command) {
        this.execute = command;
    }
}
module.exports = PrefixCommand;
