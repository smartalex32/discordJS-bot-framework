const Sequelize = require('sequelize');

const db = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite',
});

const User = require('./models/User.js')(db, Sequelize);
const Server = require('./models/Server.js')(db, Sequelize);

// Setup associations here
// Example many-to-many association
User.belongsToMany(Server, {
	through: 'userServer',
	timestamps: false,
});
Server.belongsToMany(User, {
	through: 'userServer',
	timestamps: false,
});

module.exports = { db, User, Server };