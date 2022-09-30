import {CommandManager, DataManager, SlashCommand} from './modules'
import {constants} from './constants'
import fetch from 'node-fetch'
//const fetch = require('node-fetch')
const challengesFolder = '../challenges';
import * as commandLibrary from './commands'
import * as utils from './utils'
import {SlashCommandBuilder} from '@discordjs/builders'
const commandClasses = new Map<string, typeof SlashCommand>(Object.entries(commandLibrary))
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
const commandManager = new CommandManager(dataManager, commandClasses);
const commandsToRegister = [
	commandManager.commands.get("spin")!.command,
	commandManager.commands.get("random")!.command,
]
//const commandsToRegister = Array.from(commandManager.commands.values()).map(command => command.command);
console.log(commandsToRegister);

const IS_GLOBAL = true;
const url = IS_GLOBAL ? `https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/commands` : `https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/guilds/527614443581079583/commands`;

async function registerCommand(command: SlashCommandBuilder) {
    try {
        const response = await fetch(url,
            {
                method: 'POST',
                headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bot ${process.env.DISCORD_TOKEN!}`},
                body: JSON.stringify(command.toJSON())
            })
        console.log(`${command.name}:`)
        console.log(response)
    } catch (error) {
        console.error(error);
    }
}

async function registerCommands(commands: SlashCommandBuilder[]) {
    if (commands.length != 0) {
        await registerCommand(commands[0])
        await utils.delay(1)
        await registerCommands(commands.slice(1))
    }
}
registerCommands(commandsToRegister).then(() => console.log(`Updated ${IS_GLOBAL ? "GLOBAL" : "LOCAL"} commands.`))
