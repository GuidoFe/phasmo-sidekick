require('dotenv').config();
const {SlashCommandBuilder} = require('@discordjs/builders');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.DISCORD_TOKEN;

const commands = [
    new SlashCommandBuilder()
        .setName('item')
        .setDescription('Pick a random item'),
    new SlashCommandBuilder()
        .setName('challenge')
        .setDescription('Pick a random challenge'),
    new SlashCommandBuilder()
        .setName('spin')
        .setDescription('Spin the wheel of a challenge')
        .addStringOption((option) =>
            option
                .setName('challenge')
                .setDescription('Challenge name that has a wheel to spin')
                .setRequired(true)
                .addChoice('Traits', 'traits')
                .addChoice('Traits - Bonus Wheel', 'traits-bonus')),
    new SlashCommandBuilder()
        .setName('map')
        .setDescription('Pick a random map')
        .addStringOption((option) =>
            option
                .setName('maps')
                .setDescription('List of avaiable maps, if you don\'t want to consider every map in the game')
                .setRequired(false)),
    new SlashCommandBuilder()
        .setName('clues')
        .setDescription('What ghost can I have with these clues?')
        .addStringOption((option) =>
            option
                .setName('clues')
                .setDescription('List of possible clues separated by spaces, eg. orbs spirit')),
]
    .map((command) => command.toJSON());
const rest = new REST({version: '9'}).setToken(token);
(async () => {
    try {
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            {body: commands},
        );

        console.log('Successfully registered application commands.');
    } catch (error) {
        console.error(error);
    }
})();

