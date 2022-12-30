const fs = require('node:fs');
const path = require('node:path');
const { SlashCommandBuilder } = require('discord.js');
const { createCommandsEmbed } = require('../utility/visualUtility');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('commands')
        .setDescription('Get list of commands for the Steam Randomizer Bot'),
    async execute(interaction) {
        const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

        const commands = [];

        commandFiles.forEach((file, index) => {
            const filepath = path.join(__dirname, file);
            const command = require(filepath);

            if ('data' in command && 'execute' in command) {
                commands[index] = command;
            }
        });

        const commandEmbed = await createCommandsEmbed(commands);

        interaction.reply({ embeds: [commandEmbed], ephemeral: true });
    },
};