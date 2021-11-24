import {DataManager, SlashCommand} from '@modules';
import {CommandInteraction} from 'discord.js';
import utils = require('@utils')

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
    async run(commandName: string, interaction: CommandInteraction) {
        try {
            const command = this.commands.get(commandName);
            if (command != null) {
                await command.execute(interaction);
            } else {
                console.error(`Command ${commandName} doesn't exist and it wasn't caught`);
            }
        } catch(e) {
            utils.sendLogMessage(`${interaction.toString()}\n${e}`)
        }
    };
}
