const { uuidPrimaryKey } = require("../helpers");
import models from '../models';
// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      id: uuidPrimaryKey(),
      facebookId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "facebook_id",
      },
      googleId: {
        type: Sequelize.STRING,
        allowNull: true,
        field: "google_id",
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "role_id",
        defaultValue: 0,
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
  User.addScope('associated', (partition) => {
    {
      return {
        include: [
          {
            model: models.roles,
          }
        ]
      };
    }
  });
  User.associate = (models) => {
    User.belongsTo(models.roles, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
      },
    });
    // User.belongsToMany(models.subjects, { through: "teacher_subjects", foreignKey: 'teacher_id' });
  };
  return User;
};
