const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');

/**
 * https://discordjs.guide/popular-topics/embeds.html
 */
function createEmbed() {
    return new EmbedBuilder()
        .setColor(0x0099FF)
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/AfFp7pu.png')
        .addFields(
            { name: 'Regular field title', value: 'Some value here' },
            { name: '\u200B', value: '\u200B' }, // Blank line
            { name: 'Inline field title', value: 'Some value here', inline: true },
            { name: 'Inline field title', value: 'Some value here', inline: true },
        )
        .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
        .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
}

/**
 * https://discordjs.guide/interactions/buttons.html
 * You will respond to button clicks in the InteractionCreate event
 */
function createButton() {
    return new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('buttonId')
                .setLabel('Click me!')
                .setStyle(ButtonStyle.Primary),
        );
}

/**
 * https://discordjs.guide/interactions/select-menus.html
 * You will respond to option selections in the InteractionCreate event
 */
function createSelectMenu() {
    return new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('selectMenuId')
                .setPlaceholder('Select an option')
                .setMinValues(2) // For multi-select
                .setMaxValues(3) // For multi-select
                .addOptions(
                    {
                        label: 'Option 1',
                        description: 'This is a description',
                        value: 'first_option',
                    },
                    {
                        label: 'Option 2',
                        description: 'This is also a description',
                        value: 'second_option',
                    },
                    {
                        label: 'Option 3',
                        description: 'This is a description as well',
                        value: 'third_option',
                    },
                ),
        );
}

// There are also Modals, but they are more complex and can be found at https://discordjs.guide/interactions/modals.html

module.exports = { createEmbed, createButton, createSelectMenu }