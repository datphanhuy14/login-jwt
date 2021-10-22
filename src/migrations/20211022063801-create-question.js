/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('questions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            type: {
                type: DataTypes.STRING,
                field: 'type'
            },
            lessonId: {
                type: DataTypes.INTEGER,
                field: 'lesson_id'
            },
            content: {
                type: DataTypes.STRING,
                field: 'content',
            },
            title: {
                type: DataTypes.STRING,
                field: 'title',
            },
            image: {
                type: DataTypes.STRING,
                field: 'image'
            },
            active: {
                type: DataTypes.BOOLEAN,
                field: 'active',
                defaultValue: true
            },
            media: {
                type: DataTypes.STRING,
                field: 'media'
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
        return migration.dropTable('questions');
    },
};
