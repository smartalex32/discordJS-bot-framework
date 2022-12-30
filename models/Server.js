module.exports = (db, Sequelize) => {
    const Server = db.define('server', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false,
        },
        name: Sequelize.STRING,
        icon: Sequelize.STRING,
    }, { timestamps: false });
    return Server;
};