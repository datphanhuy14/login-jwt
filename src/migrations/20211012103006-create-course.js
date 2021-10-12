/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
  up: (migration, DataTypes) => {
    return migration.createTable("courses", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        field: "title",
      },
      code: {
        type: DataTypes.STRING,
        field: "code",
      },
      creditFee: {
        type: DataTypes.INTEGER,
        field: "credit_fee",
      },
      registrationFee: {
        type: DataTypes.INTEGER,
        field: "registration_fee",
      },
      content: {
        type: DataTypes.STRING,
        field: "content",
      },
      status: {
        type: DataTypes.STRING,
        field: "status",
        defaultValue: "active",
      },
      image: {
        type: DataTypes.STRING,
        field: "image",
      },
      slug: {
        type: DataTypes.STRING,
        field: "slug",
      },
      credits: {
        type: DataTypes.INTEGER,
        field: "credits",
      },
      subjects: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        field: "subjects",
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "start_time",
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: true,
        field: "end_time",
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
    return migration.dropTable("courses");
  },
};
