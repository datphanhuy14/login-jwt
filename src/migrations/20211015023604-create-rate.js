/* eslint-disable no-unused-vars */
'use strict';

module.exports = {
    up: (migration, DataTypes) => {
        return migration.createTable('rates', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.UUID,
                field: 'user_id'
            },
            courseId: {
                type: DataTypes.INTEGER,
                field: 'course_id'
            },
            rating: {
                type: DataTypes.INTEGER,
                field: 'rating',
            },
            description: {
                type: DataTypes.STRING,
                field: 'description',
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
        return migration.dropTable('rates');
    },
};
