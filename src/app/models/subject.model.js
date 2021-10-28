/* eslint-disable no-unused-vars */

// const models = require("../models");
import models from ".";

module.exports = (sequelize, Sequelize) => {
    const Subject = sequelize.define(
        'subjects',
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'title',
            },
            code: {
                type: Sequelize.STRING,
                field: 'code',
            },
            content1: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'content_1',
            },
            content2: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'content_2',
            },
            content3: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'content_3',
            },
            active: {
                type: Sequelize.BOOLEAN,
                field: 'active',
                defaultValue: true,
            },
            image: {
                type: Sequelize.STRING,
                field: 'image',
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
                field: 'created_at',
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                field: 'updated_at',
            },
        },
        {
            timestamps: true,
            underscored: true,
            tableName: 'subjects',
        },
    );
    Subject.associate = (models) => {
        Subject.hasMany(models.courses);
    };
    return Subject;

};
