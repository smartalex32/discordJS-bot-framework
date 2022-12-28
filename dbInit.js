const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});

// require('./data/models/User.js')(sequelize, Sequelize.DataTypes);

const force = process.argv.includes('--force') || process.argv.includes('-f');

// For testing it will overwrite the DB
// sequelize.sync({ force }).then(async () => {
sequelize.sync().then(async () => {
	console.log('Database synced');
}).catch(console.error);