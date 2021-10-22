/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('lessons', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            content1: {
                type: DataTypes.STRING,
                field: 'content_1'
            },
            content2: {
                type: DataTypes.STRING,
                field: 'content_2'
            },
            content3: {
                type: DataTypes.STRING,
                field: 'content_3'
            },
            courseId: {
                type: DataTypes.INTEGER,
                field: 'course_id'
            },
            title: {
                type: DataTypes.STRING,
                field: 'title'
            },
            media: {
                type: DataTypes.STRING,
                field: 'media'
            },
            image: {
                type: DataTypes.STRING,
                field: 'image'
            },
            description: {
                type: DataTypes.STRING,
                field: 'image'
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
        return migration.dropTable('lessons');
    },
};
