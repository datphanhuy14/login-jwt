const { v4: uuidv4 } = require("uuid");
// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4(),
        unique: true,
      },
      fullname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        validate: {isEmail: true}
      },
      password: {
        type: Sequelize.STRING,
      },
      active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        field: "role_id",
        validate: {
          min: 0,
          max: 5,
        },
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'created_at'
    },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at'
    }
    },
    {
      timestamps: true,
      tableName: "users",
    }
  );

  return Users; 
};
