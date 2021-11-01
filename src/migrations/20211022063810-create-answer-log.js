/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('answer_logs', {
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
            userId: {
                type: DataTypes.UUID,
                field: 'user_id'
            },
            questionId: {
                type: DataTypes.INTEGER,
                field: 'question_id'
            },
            lessonId: {
                type: DataTypes.INTEGER,
                field: 'lesson_id'
            },
            content: {
                type: DataTypes.STRING,
                field: 'content',
            },
            turn: {
                type: DataTypes.STRING,
                field: 'turn',
            },
            submit_answer: {
                type: DataTypes.STRING,
                field: 'image'
            },
            active: {
                type: DataTypes.BOOLEAN,
                field: 'active',
                defaultValue: true
            },
            answer: {
                type: DataTypes.STRING,
                field: 'answer'
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
        return migration.dropTable('answer_logs');
    },
};
