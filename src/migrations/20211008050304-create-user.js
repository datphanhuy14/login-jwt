/* eslint-disable no-unused-vars */
'use strict';
const uuidPrimaryKey = require('../app/helpers/uuid')

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('users', {
            id: uuidPrimaryKey(),
            googleId:{
              type: DataTypes.STRING,
              allowNull: true,
              field:"google_id"
            },
            facebookId:{
              type: DataTypes.STRING,
              allowNull: true,
              field:"facebook_id"
            },
            email:{
              type:DataTypes.STRING,
              allowNull: false,
              field: 'email'
            },
            password: {
              type : DataTypes.STRING,
              allowNull: false,
              field: 'password'
            },
            fullname: {
              type : DataTypes.STRING,
              allowNull: false,
              field: 'fullname'
            },
            active: {
              type: DataTypes.BOOLEAN,
              field: 'active'
            },
            roleId: {
              type: DataTypes.INTEGER,
              allowNull: true,
              field: "role_id",
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'created_at'
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at'
            }
        });
    },
    down: (migration, DataTypes) => {
        return migration.dropTable('users');
    }
};
