'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('courses','updated_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('courses','created_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('subjects','updated_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('subjects','created_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('lessons','updated_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('lessons','created_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('questions','updated_by',{type: Sequelize.DataTypes.UUID});
        await queryInterface.addColumn('questions','created_by',{type: Sequelize.DataTypes.UUID});

    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('courses','updated_by');
        await queryInterface.removeColumn('courses','created_by');
        await queryInterface.removeColumn('subjects','updated_by');
        await queryInterface.removeColumn('subjects','created_by');
        await queryInterface.removeColumn('lessons','updated_by');
        await queryInterface.removeColumn('lessons','created_by');
        await queryInterface.removeColumn('questions','updated_by');
        await queryInterface.removeColumn('questions','created_by');
    }
};
