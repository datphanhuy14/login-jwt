/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (migration, DataTypes) => {
    return migration.createTable('levels', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      code: {
        type: DataTypes.STRING,
        field: 'code',
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: 'active',
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at',
      },

      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at',
      },
    });
  },
  down: (migration, DataTypes) => {
    return migration.dropTable('levels');
  },
};
