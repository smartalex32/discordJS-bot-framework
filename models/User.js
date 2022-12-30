module.exports = (db, Sequelize) => {
    const User = db.define('user', {
        discordId: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    }, { timestamps: false });
    return User;
};