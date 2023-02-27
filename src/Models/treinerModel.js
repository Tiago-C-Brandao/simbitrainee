const Sequelize = require('sequelize');
const database = require('../Database/db');

module.exports = database.define('trainer', {
    trainer_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    trainer_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    trainer_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    members: {
        type: Sequelize.JSON
    },
});