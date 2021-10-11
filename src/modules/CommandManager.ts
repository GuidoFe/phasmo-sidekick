import utils = require('@utils');
import {DataManager, PrefixCommand, AdminCommand} from '@modules';
import commandClasses = require('@commands');
import adminCommandClasses = require('@adminCommands');
import {Message, Client} from 'discord.js';

export class CommandManager {
    commands = new Map<string, PrefixCommand>();
    adminCommands = new Map<string, AdminCommand>();
    dataManager: DataManager;
    constructor(dataManager: DataManager, commandClasses: Map<string, typeof PrefixCommand>, adminCommandClasses: Map<string, typeof AdminCommand>, client: Client) {
        commandClasses.forEach((commandClass, _className) => {
            const command = new commandClass(dataManager);
            this.commands.set(command.name, command);
        });
        adminCommandClasses.forEach((adminCommandClass, _className) => {
            const command = new adminCommandClass(dataManager, client);
            this.adminCommands.set(command.name, command);
        });
        const helpCommand = this.commands.get('help') as commandClasses.HelpCommand;
        const adminHelpCommand = this.adminCommands.get('adminHelp') as adminCommandClasses.AdminHelp;
        if (helpCommand != null) {
            helpCommand.init(this.commands);
        } else {
            throw 'Error: no help command available';
        }
        if (adminHelpCommand != null) {
            adminHelpCommand.init(this.adminCommands);
        } else {
            throw 'Error: no admin help command available';
        }
        this.dataManager = dataManager;
    };
    run(commandName: string, message: Message, isAdmin: boolean) {
        let command;
        if (isAdmin) {
            command = this.adminCommands.get(commandName);
        } else {
            command = this.commands.get(commandName);
        }
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
            if (args.length > 1 && this.commands.has(args[1])) {
                const result = this.run(args[1], message, false);
                return result;
            } else if (message.author?.id == '279675088121626624' && this.adminCommands.has(args[1])) {
                const result = this.run(args[1], message, true);
                return result;
            }else {
                return 1;
            };
        } catch (error) {
            utils.sendLogMessage(error);
        };
    };
}
