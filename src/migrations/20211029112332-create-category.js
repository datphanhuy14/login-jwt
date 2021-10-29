/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable("categories", {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                field: 'name',
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                field: 'updated_at',
            },
        });
    },
    down: (migration, DataTypes) => {
        return migration.dropTable("categories");
    },
};
