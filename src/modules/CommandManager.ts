import {DataManager, SlashCommand} from '@modules';
import {CommandInteraction} from 'discord.js';

export class CommandManager {
    commands = new Map<string, SlashCommand>();
    dataManager: DataManager;
    constructor(dataManager: DataManager, commandClasses: Map<string, typeof SlashCommand>) {
        commandClasses.forEach((commandClass, _className) => {
            const command = new commandClass(dataManager);
            this.commands.set(command.name, command);
        });
        //const adminHelpCommand = this.adminCommands.get('adminHelp') as adminCommandClasses.AdminHelp;
        this.dataManager = dataManager;
    };
    run(commandName: string, interaction: CommandInteraction) {
        const command = this.commands.get(commandName);
        if (command != null) {
            command.execute(interaction);
        } else {
            console.error(`Command ${commandName} doesn't exist and it wasn't caught`);
        }
    };
}
