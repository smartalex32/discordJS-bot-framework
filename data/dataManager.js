const { User, Server } = require('../dbObjects');

async function checkIfPlaying(discordId) {
    return await User.findOne({
        where: {
            discordId: discordId
        }
    }).then(user => user !== null);
}

async function addOrUpdateServer(serverObj) {
    return await Server.upsert({
        id: serverObj.id,
        name: serverObj.name,
        icon: serverObj.iconURL(),
    }).then(() => true);
}

async function getUser(discordId) {
    return await User.findOne({
        where: {
            discordId: discordId
        }
    });
}

async function addOrUpdateUser(serverObj, userObj) {
    console.log(`addOrUpdateUser: ${serverObj.id} ${userObj.id}`);

    // Add or update user in Users table
    const [user] = await User.upsert({
        discordId: userObj.id,
        username: userObj.username,
    });

    // Find or create Server row 
    const [server] = await Server.findOrCreate({
        where: {
            id: serverObj.id,
        },
        defaults: { // Values to populate row with if does not exist
            id: serverObj.id,
            name: serverObj.name,
            icon: serverObj.iconURL(),
        }
    });

    // Adds value to join table ServerUser that is autocreated by Sequelize
    // This will relate the user and a server
    return await user.addServer(server)
        .then(() => true);
}

async function getFirstTen(serverId) {
    return await User.findAll({
        include: {
            model: Server,
            where: {
                id: serverId,
            }
        },
        order: [
            ['discordId', 'ASC'],
        ],
        limit: 10
    });
}

module.exports = {
    checkIfPlaying,
    addOrUpdateServer,
    getUser,
    addOrUpdateUser,
    getFirstTen
}