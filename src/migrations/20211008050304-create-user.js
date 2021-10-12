/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('users', {
            id: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique:true,
                allowNull: false
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
              validate: {
                min: 0,
                max: 5,
              },
              defaultValue: 0,
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
