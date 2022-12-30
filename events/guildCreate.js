const { Events } = require("discord.js");
const { deployCommands } = require("../deploy-commands");

module.exports = {
    name: Events.GuildCreate,
    async execute(guild) {
        if (guild.available) {
            // deploy commands to new server
            console.log(`Deploying commands to new Guild: ${guild.id}`)
            deployCommands(guild.id);
        }
    }
};