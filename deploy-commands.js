const { REST, Routes } = require('discord.js');
const { clientid, token } = require('./config.json');
const fs = require('node:fs');

function deployCommands(guildId) {
	const commands = [];
	// Grab all the command files from the commands directory you created earlier
	const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		commands.push(command.data.toJSON());
	}

	// Construct and prepare an instance of the REST module
	const rest = new REST({ version: '10' }).setToken(token);

	// and deploy your commands!
	(async () => {
		try {
			const data = await rest.put(
				Routes.applicationGuildCommands(clientid, guildId),
				{ body: commands },
			);
			console.log(`Successfully reloaded ${data.length} application (/) commands for Server: ${guildId}`);
		} catch (error) {
			// And of course, make sure you catch and log any errors!
			console.error(error);
		}
	})();
}

module.exports = {
	deployCommands
}