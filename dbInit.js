const { db } = require('./dbObjects');

// If you need to override the DB, then include {force} in the sync() call
let syncOptions = {};
const force = process.argv.includes('--force') || process.argv.includes('-f');
if (force) syncOptions.force = true;
else {
	syncOptions.force = false;
	syncOptions.alter = true;
}

db.sync(syncOptions)
	.then(async () => console.log('Database synced'))
	.catch(err => console.error('Error creating tables:', err));