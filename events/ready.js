const { Events } = require('discord.js');
const { deployCommands } = require('../deploy-commands');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);

		// Getting the discord IDs of all servers that have the bot
		const serverList = client.guilds.cache.map(guild => guild.id);

		console.log(`Deploying commands`);

		// Deploys commands to all servers using the bot
		serverList.forEach(server => {
			deployCommands(server);
		})
	},
};