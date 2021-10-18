/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (migration, DataTypes) => {
    return migration.createTable('subjects', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'title',
      },
      code: {
        type: DataTypes.STRING,
        field: 'code',
      },
      creditFee: {
        type: DataTypes.INTEGER,
        field: 'credit_fee',
      },
      registrationFee: {
        type: DataTypes.INTEGER,
        field: 'registration_fee',
      },
      content1: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'content_1',
      },
      content2: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'content_2',
      },
      content3: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'content_3',
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: 'active',
        defaultValue: true,
      },
      image: {
        type: DataTypes.STRING,
        field: 'image',
      },
      credits: {
        type: DataTypes.INTEGER,
        field: 'credits',
      },
      subjects: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        field: 'subjects',
        defaultValue: []
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'start_time',
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'end_time',
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
    return migration.dropTable('subjects');
  },
};
