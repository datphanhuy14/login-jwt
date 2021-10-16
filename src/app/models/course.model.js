/* eslint-disable no-unused-vars */

// const db = require("../models");
module.exports = ( sequelize, Sequelize ) => {
  const Course = sequelize.define(
      'courses',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        title: {
          type: Sequelize.STRING,
          allowNull: false,
          field: 'title',
        },
        code: {
          type: Sequelize.STRING,
          field: 'code',
        },
        creditFee: {
          type: Sequelize.INTEGER,
          field: 'credit_fee',
        },
        registrationFee: {
          type: Sequelize.INTEGER,
          field: 'registration_fee',
        },
        content1: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'content_1',
        },
        content2: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'content_2',
        },
        content3: {
          type: Sequelize.STRING,
          allowNull: true,
          field: 'content_3',
        },
        active: {
          type: Sequelize.BOOLEAN,
          field: 'active',
          defaultValue: true,
        },
        image: {
          type: Sequelize.STRING,
          field: 'image',
        },
        levelId: {
          type: Sequelize.INTEGER,
          allowNull: true,
          field: 'level_id',
        },
        credits: {
          type: Sequelize.INTEGER,
          field: 'credits',
        },
        subjects: {
          type: Sequelize.ARRAY( Sequelize.JSON ),
          field: 'subjects',
        },
        startTime: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'start_time',
        },
        endTime: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'end_time',
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'created_at',
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: true,
          field: 'updated_at',
        },
      },
      {
        timestamps: true,
        underscored: true,
        tableName: 'courses',
      },
  );
  Course.associate = ( models ) => {
    Course.belongsTo( models.levels, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: true,
      },
    } );
  };
  return Course;
};
