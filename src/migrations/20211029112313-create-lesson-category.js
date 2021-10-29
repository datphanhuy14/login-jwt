/* eslint-disable no-unused-vars */
"use strict";

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable("lessons_categories", {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            lessonId: {
                type: DataTypes.INTEGER,
                field: 'lesson_id'
            },
            categoryId: {
                type: DataTypes.INTEGER,
                field: 'category_id'
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
        return migration.dropTable("categlessons_categoriesories");
    },
};
