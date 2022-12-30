const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { createEmbed, createButton, createSelectMenu } = require('../utility/visuals');
/**
 * This is an example of a slash command with some basic functionality included to see some potential
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('example_command') // Name of the slash command. Needs to be lowercase
        .setDescription('This is where you put the description that will appear on Discord') // Description that appears on Discord
        .addUserOption(option => // This is if you want to add an additional option the user can enter for more information
            option
                .setName('user') // name of the option that will appear with the slash command on Discord
                .setDescription('This is an an additional option the user needs to enter')) // This is a description for the option, and it will appear on Discord
        .addStringOption(option =>
            option
                .setName('user_option')
                .setDescription('This is a description')
                .setRequired(true)), // This is if you want the user to have to enter more info with the command
    async execute(interaction) {
        // You can retrieve many fields from the interaction
        // More infor about the fields can be found: https://discord.com/developers/docs/interactions/receiving-and-responding

        // User Object: https://discord.com/developers/docs/resources/user
        const userObj = interaction.user;

        // Server (Guild) Object: https://discord.com/developers/docs/resources/guild
        const serverObj = interaction.member.guild;

        // How to get the options requested
        const userOption = interaction.options.getUser('user') ?? interaction.user;
        const stringOption = interaction.options.getString('user_option');

        /** Common types of replies */
        // You can only reply to a command once

        // Standard reply to a command
        await interaction.reply({ content: `The user is ${userOption} and they entered ${stringOption}` });

        // If the user wants the response to only appear to the sender, they can add 'ephemeral: true'
        await interaction.reply({ content: `The user is ${userOption} and they entered ${stringOption}`, ephemeral: true });

        // If you expec the logic in the command to take more than 3 seconds, you can deferReply at the top of your command
        // and then once you are ready to reply, you can use editReply
        await interaction.deferReply();
        // Do some things
        await interaction.editReply({ content: `The user is ${userOption} and they entered ${stringOption}` });

        /** Common Reply Components - you can also include many types of components with the replies */
        // You can include these components with other tags in reply or send, but they are left off here for clarity
        await interaction.reply({ embeds: [createEmbed] });
        await interaction.reply({ content: 'This is a message', components: [createButton] });
        await interaction.reply({ content: 'This is a message', components: [createSelectMenu] });
    },
};