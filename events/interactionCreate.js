const { Events } = require('discord.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		// Short circuit since we only need to react to slash commands or button presses
		if (!interaction.isChatInputCommand || !interaction.isButton) return;

		// Handle the slash command option or chat input if your bot listens to sent messages
		if (interaction.isChatInputCommand()) {
			console.log(`Chat Command Received`);
			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}

			try {
				// Calls the relevant command based on what the user typed
				await command.execute(interaction);
			} catch (error) {
				console.error(`Error executing ${interaction.commandName}`);
				console.error(error);
			}
		}

		// Button click handler
		if (interaction.isButton()) {
			console.log(`Button Press Received`);

			if (interaction.customId === `buttonId`) {
				await interaction.update({ content: `This is the message content`, components: [] }); // This will remove the button
				// await interaction.update({content: `This is the message content`}); // This will keep the button
			}
		}
	},
};