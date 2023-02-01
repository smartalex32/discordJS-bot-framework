# discordJS_Bot_Framework
**A barebones setup of a discord bot in discord.js that can be forked for different bots**

## Process for using the framework

### Installation
First, `npm install` will download all the packages and setup your node_modules directory

### Running
To run, `npm run start` will launch the run command found in [package.json](/package.json). This will start up the server in [index.js](/index.js), which will loop through all the created commands in the [commands](/commands/) directory and then [deploy](/deploy-commands.js) the commands to all servers with your bot using the [ready](/events/ready.js) event file.

### Commands
To add new commands, you can follow the [example](/commands/exampleCommand.js) command, and add the new file to the [commands](/commands/) directory.The program will automatically pull them in the next time you launch your bot.

There is also a default command called [commands.js](/commands/commands.js) that will send a message that only that user can see with the list of commands on the server.

You can also find examples of different visuals you can use in the [visuals.js](/utility/visuals.js) file. This will have some common items like buttons and embeds, withlinks to documentation.

### Events
There are a few default events that are in the [events](/events/) directory.
- [ready.js](/events/ready.js) - the event listener for when the bot is up and running. This is also where the commands are deployed.
- [interactionCreate.js](/events/interactionCreate.js) - the standard user interaction event. This is where you can determine if the events were messages, from buttons, or other types of interactions. Currently there are checks for chat and button interactions.
- [guildCreate.js](/events/guildCreate.js) - a listener for when the bot gets added to a guild(server). It will also deploy the commands to the server when it is able.

### Database
I have used Sequelize with sqlite as the basic database.

The [models](/models/) directory has all of the basic models used by the database. By default, I have created [User](/models/User.js) and [Server](/models/Server.js) models with a many-to-many relationship.

[dbObjects.js](/dbObjects.js) is the file where the associations for the models is created.

To instantiate the database, run `node .\dbInit.js` and add `--force` if you want to completely recreate for initial testing.

[dataManager.js](/data/dataManager.js) is a basic file that is used to access the database. It has some basic interactions that can be used.

*If this is not applicable to your bot, then you can remove them from the [package.json](/package.json) file and run `npm install` again. You can also remove all the files noted above.*

## Hosting
If you want to run the bot on a local machine, then you can just run `npm run start` on that machine with the codebase, and leave it up. If you want to host it somewhere, then you will need to copy the relevant files to that server, and then run `npm run start`.

I would also recommend using pm2 if you want to easily manage having multiple bots running.