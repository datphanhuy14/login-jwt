/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: ( migration, DataTypes ) => {
    return migration.createTable( 'subjects', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      content1: {
        type: DataTypes.STRING,
        field: 'content_1',
      },
      content2: {
        type: DataTypes.STRING,
        field: 'content_2',
      },
      content3: {
        type: DataTypes.STRING,
        field: 'content_3',
      },
      code: {
        type: DataTypes.STRING,
        field: 'code',
      },
      credits: {
        type: DataTypes.INTEGER,
        field: 'credits',
      },
      title: {
        type: DataTypes.STRING,
        field: 'title',
      },
      teachers: {
        type: DataTypes.ARRAY( DataTypes.UUID ),
        field: 'teachers',
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: 'status',
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
    } );
  },
  down: ( migration, DataTypes ) => {
    return migration.dropTable( 'subjects' );
  },
};
