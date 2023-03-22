'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Member = await queryInterface.createTable('members', {
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
          allowNull: true,
          references: { model: 'trainers', key: 'trainer_id'},
          onUpdaye: 'CASCADE',
          onDelete: 'SET NULL'
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
  
  Member.associate = (models) => {
      Member.belongsTo(models.Trainer,
        { foreignKey: 'trainer_id', as: 'trainers' });
    };
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('members');
  }
};
