import {Client, GatewayIntentBits, ActivityOptions, ChatInputCommandInteraction} from 'discord.js';
import {DataManager, CommandManager, SlashCommand} from './modules';
import {dirname} from 'path';
const challengesFolder = '../challenges';
import {constants} from './constants';
const dataManager = new DataManager();
dataManager.init(constants, challengesFolder);
import * as commandLibrary from './commands';
const commandClasses = new Map<string, typeof SlashCommand>(Object.entries(commandLibrary));
const client = new Client({intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]});
const commandManager = new CommandManager(dataManager, commandClasses);
import { updateServerStats } from './updateServerStats';

const statusMessages: ActivityOptions[] = [
    {name: '_NUM_SERVERS', type: 0},
    {name: 'basketball', type: 0},
    {name: 'Ghostbusters', type: 3},
    {name: 'Casper', type: 3},
    {name: 'with the Ouija', type: 0},
    {name: 'The Shining', type: 3},
    {name: 'Phasmophobia', type: 0},
    {name: 'the guitar', type: 0},
    {name: 'Nightmare mode', type: 0},
    {name: 'the bonfire', type: 3},
    {name: 'cornhole', type: 0},
    {name: 'ring toss', type: 0},
];

function updateActivity(client: Client, statusMessages: ActivityOptions[]) {
    client.user!.setActivity('/help', {type: 0});
}
client.once('ready', () => {
    console.log(`Ready! Currently in ${client.guilds.cache.size} servers`);
    updateActivity(client, [statusMessages[0]]);
    if (process.env.TESTING == "0") {
        updateServerStats(client);
        setInterval(() => {updateServerStats(client);}, 1800000);
    }
});
client.login(process.env.DISCORD_TOKEN);
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if(interaction.user.bot) return;
    commandManager.run(interaction.commandName, interaction as ChatInputCommandInteraction)
});
client.on('guildCreate', (guild) => {
    console.log(`Joined ${guild.name}`);
});
