
/* eslint-disable no-unused-vars */

// const db = require("../models");
module.exports = ( sequelize, Sequelize ) => {
  const Subject = sequelize.define(
      'subjects',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          unique: true,
          autoIncrement: true,
        },
        content1: {
          type: Sequelize.STRING,
          field: 'content_1',
        },
        content2: {
          type: Sequelize.STRING,
          field: 'content_2',
        },
        content3: {
          type: Sequelize.STRING,
          field: 'content_3',
        },
        code: {
          type: Sequelize.STRING,
          field: 'code',
        },
        credits: {
          type: Sequelize.INTEGER,
          field: 'credits',
        },
        title: {
          type: Sequelize.STRING,
          field: 'title',
        },
        teachers: {
          type: Sequelize.ARRAY( Sequelize.UUID ),
          field: 'teachers',
        },
        active: {
          type: Sequelize.BOOLEAN,
          field: 'status',
          defaultValue: true,
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
        tableName: 'subjects',
      },
  );
  Subject.associate = ( models ) => {
    Subject.belongsToMany( models.users, {through: 'user_teacher'} );
  };
  return Subject;
};

