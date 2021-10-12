/* eslint-disable no-unused-vars */

// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
  const Courses = sequelize.define(
    "courses",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
          },
          title: {
            type: Sequelize.STRING,
            field: "title",
          },
          code: {
            type: Sequelize.STRING,
            field: "code",
          },
          creditFee: {
            type: Sequelize.INTEGER,
            field: "credit_fee",
          },
          registrationFee: {
            type: Sequelize.INTEGER,
            field: "registration_fee",
          },
          content: {
            type: Sequelize.STRING,
            field: "content",
          },
          status: {
            type: Sequelize.STRING,
            field: "status",
            defaultValue: "active",
          },
          image: {
            type: Sequelize.STRING,
            field: "image",
          },
          slug: {
            type: Sequelize.STRING,
            field: "slug",
          },
          credits: {
            type: Sequelize.INTEGER,
            field: "credits",
          },
          subjects: {
            type: Sequelize.ARRAY(Sequelize.JSON),
            field: "subjects",
          },
          startTime: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "start_time",
          },
          endTime: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "end_time",
          },
          createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "created_at",
          },
          updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "updated_at",
          },
    },
    {
      timestamps: true,
      underscored: true,
      tableName: "users",
    }
  );
  Courses.associate = (models) => {
      
  };
  return Courses;
};
