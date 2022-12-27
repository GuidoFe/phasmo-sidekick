import {DataManager, SlashCommand} from '../modules/index.js';
import {ChatInputCommandInteraction} from 'discord.js';
import * as utils from '../utils.js';

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
    async run(commandName: string, interaction: ChatInputCommandInteraction) {
        try {
            const command = this.commands.get(commandName);
            if (command != null) {
                command.execute(interaction).catch((error) => {console.log(error); utils.sendLogMessage(error);})
            } else {
                utils.sendLogMessage(`Command ${commandName} doesn't exist and it wasn't caught`);
                console.error(`Command ${commandName} doesn't exist and it wasn't caught`);
            }
        } catch(e) {
            let msg = commandName
            interaction.options.data.forEach(data => msg += ` ${data.value ? data.value : `<${data.name}>`}`)
            utils.sendLogMessage(`${msg}\n${e}`)
        }
    };
}
