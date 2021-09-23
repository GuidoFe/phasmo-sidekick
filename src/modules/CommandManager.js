const fs = require('fs');
const path = require('path');
const utils = require('@utils');

class CommandManager {
    commands = {};
    constructor(commandsFolder, dataManager) {
        const files = fs.readdirSync(commandsFolder);
        this.dataManager = dataManager;
        // Read commands
        for (const file of files) {
            const filePath = path.join(commandsFolder, file);
            const stat = fs.statSync(filePath);
            if (stat.isFile() && filePath.endsWith('.js')) {
                const moduleName = filePath.slice(0, -3);
                const CommandClass = require(moduleName);
                const commandInstance = new CommandClass(dataManager);
                this.commands[commandInstance.name] = commandInstance;
            };
        };
        this.commands['help'].init(this.commands);
    };
    run(commandName, message) {
        this.commands[commandName].execute(message);
    };
    async parseMessage(message) {
        try {
            if (!message.content.startsWith(this.dataManager.constants.prefix)) return;
            const args = utils.getMessageArguments(message);
            if (args.length < 2) {
                this.commands['help'].execute(message);
                return 0;
            };
            if (args[1] in this.commands) {
                const result = this.run(args[1], message);
                return result;
            } else {
                message.reply(utils.errorMessageBuilder('Error: command not valid'));
                return 1;
            };
        } catch (error) {
            utils.sendLogMessage(error);
        };
    };
}

module.exports = CommandManager;
