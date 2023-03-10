const Sequelize = require('sequelize');
const database = require('../Database/db');

const Member = database.define('member', {
    member_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    member_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    member_email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    trainer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'trainers', key: 'trainer_id'},
        onUpdaye: 'CASCADE',
        onDelete: 'SET NULL'
    }
});

Member.associate = (models) => {
    Member.belongsTo(models.Trainer,
      { foreignKey: 'trainer_id', as: 'trainers' });
  };

module.exports = Member