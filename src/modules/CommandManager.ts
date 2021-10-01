import utils = require('@utils');
import {DataManager, PrefixCommand} from '@modules';
import commandClasses = require('@commands');
import {Message} from 'discord.js';

export class CommandManager {
    commands = new Map<string, PrefixCommand>();
    dataManager: DataManager;
    constructor(dataManager: DataManager, commandClasses: Map<string, typeof PrefixCommand>) {
        commandClasses.forEach((commandClass, _className) => {
            const command = new commandClass(dataManager);
            this.commands.set(command.name, command);
        });
        const helpCommand = this.commands.get('help') as commandClasses.HelpCommand;
        if (helpCommand != null) {
            helpCommand.init(this.commands);
        } else {
            throw 'Error: no help command available';
        }
        this.dataManager = dataManager;
    };
    run(commandName: string, message: Message) {
        const command = this.commands.get(commandName);
        if (command != null) {
            command.execute(message);
        } else {
            throw `Command ${commandName} doesn't exist and it wasn't caught`;
        }
    };
    async parseMessage(message: Message) {
        try {
            if (!message.content.startsWith(this.dataManager.constants.prefix)) return;
            const args = utils.getMessageArguments(message);
            if (args.length < 2) {
                this.commands.get('help')?.execute(message);
                return 0;
            };
            if (this.commands.has(args[1])) {
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
