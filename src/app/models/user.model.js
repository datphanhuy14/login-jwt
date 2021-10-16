const { uuidPrimaryKey } = require("../helpers");

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
  User.associate = (models) => {
    User.belongsTo(models.roles, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: true,
      },
    });
    User.belongsToMany(models.subjects, { through: "user_teacher" });
  };
  return User;
};
