const Sequelize = require('sequelize');
const database = require('../Database/db');

const Trainer = database.define('trainer', {
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

Trainer.associate = (models) => {
    Trainer.hasMany(models.Member,
      { foreignKey: 'trainer_id', as: 'members' });
  };

module.exports = Trainer