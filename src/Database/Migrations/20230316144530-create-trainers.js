'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     const Trainer = await queryInterface.createTable('trainers', { 
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
     }
    });

    Trainer.associate = (models) => {
      Trainer.hasMany(models.Member,
        { foreignKey: 'trainer_id', as: 'members' });
    };
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('trainers');
  }
};
