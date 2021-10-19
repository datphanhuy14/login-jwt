'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'tel', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: true,
      field: 'tel'
    });
    await queryInterface.addColumn('users', 'avatar', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: 'avatar'
    });
    await queryInterface.addColumn('users', 'date_of_birth', {
      type: Sequelize.DataTypes.DATE,
      allowNull: true,
      field: 'date_of_birth'
    });
    await queryInterface.addColumn('users', 'display_name', {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
      field: 'display_name'
    });

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'tel', {});
    await queryInterface.removeColumn('users', 'avatar', {});
    await queryInterface.removeColumn('users', 'date_of_birth', {});
    await queryInterface.removeColumn('users', 'display_name', {});
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
