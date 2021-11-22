import 'module-alias/register'
//import {REST} from '@discordjs/rest';
import {CommandManager, DataManager, SlashCommand} from '@modules'
import {constants} from '@constants'
import fetch from 'node-fetch'
//const fetch = require('node-fetch')
import path = require('path')
const challengesFolder = path.dirname(require.resolve('@index')) + '/../challenges';
import commandLibrary = require('@commands')
const commandClasses = new Map<string, typeof SlashCommand>(Object.entries(commandLibrary))
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
const commandManager = new CommandManager(dataManager, commandClasses);
const commandsToRegister = Array.from(commandManager.commands.values()).map(command => command.command.toJSON());
console.log(commandsToRegister);
(async () => {
    commandsToRegister.forEach(async (command) =>  {
        try {
            const response = await fetch(`https://discord.com/api/v8/applications/${process.env.CLIENT_ID}/commands`,
                {
                    method: 'POST',
                    headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bot ${process.env.DISCORD_TOKEN!}`},
                    body: JSON.stringify(command)
                })
            console.log(`${command.name}:`)
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    })
})();
