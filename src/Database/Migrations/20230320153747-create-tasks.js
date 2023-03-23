'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const Task = await queryInterface.createTable('tasks', {
      task_id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true
      },
      task_title: {
          type: Sequelize.STRING,
      },
      task_description: {
          type: Sequelize.STRING,
      },
      date_delivery: {
          type: Sequelize.DATE,
      },
      date_send: {
          type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "Pendente"
      },
      member_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
          references: { model: 'members', key: 'member_id'},
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
  
  Task.associate = (models) => {
      Task.belongsTo(models.Member,
        { foreignKey: 'member_id', as: 'members' });
    };
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};
