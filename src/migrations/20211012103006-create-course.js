/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
  up: (migration, DataTypes) => {
    return migration.createTable('courses', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      content1: {
        type: DataTypes.STRING,
        field: "content_1",
      },
      content2: {
        type: DataTypes.STRING,
        field: "content_2",
      },
      content3: {
        type: DataTypes.STRING,
        field: "content_3",
      },
      code: {
        type: DataTypes.STRING,
        field: "code",
      },
      registrationFee: {
        type: DataTypes.INTEGER,
        field: 'registration_fee',
      },
      title: {
        type: DataTypes.STRING,
        field: "title",
      },
      active: {
        type: DataTypes.BOOLEAN,
        field: "active",
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "updated_at",
      },
    });
  },
  down: (migration, DataTypes) => {
    return migration.dropTable('courses');
  },
};
