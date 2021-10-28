/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable("user_roles", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.UUID,
                field: "user_id",
            },
            roleId: {
                type: DataTypes.INTEGER,
                field: "role_id",
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
        return migration.dropTable("user_roles");
    },
};
