/* eslint-disable no-unused-vars */
import models from '.';
// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define(
        "courses",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            content1: {
                type: Sequelize.STRING,
                field: "content_1",
            },
            content2: {
                type: Sequelize.STRING,
                field: "content_2",
            },
            content3: {
                type: Sequelize.STRING,
                field: "content_3",
            },
            code: {
                type: Sequelize.STRING,
                field: "code",
            },
            registrationFee: {
                type: Sequelize.INTEGER,
                field: 'registration_fee',
            },
            title: {
                type: Sequelize.STRING,
                field: "title",
            },
            active: {
                type: Sequelize.BOOLEAN,
                field: "active",
                defaultValue: true,
            },
            createdBy: {
                type: Sequelize.UUID,
                allowNull: true,
                field: "created_by",
            },
            updatedBy: {
                type: Sequelize.UUID,
                allowNull: true,
                field: "updated_by",
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: true,
                field: "created_at",
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: true,
                field: "updated_at",
            },
        },
        {
            timestamps: true,
            underscored: true,
            tableName: "courses",
        }
    );
    model.addScope('associated', (partition) => {
        {
            return {
                include: [
                    {
                        model: models.rates,
                        attributes: [
                            "userId",
                            "courseId",
                            "rating",
                            "description",
                        ]


                    },
                    {
                        model: models.userCourses,
                        attributes: [
                            "userId",
                            "courseId",
                            "type"
                        ]
                    },
                    {
                        model: models.subjects,
                        attributes: [
                            "id",
                            "title",
                            "code"
                        ]
                    }
                ]
            };
        }
    });

    model.associate = (models) => {
        model.hasMany(models.rates, {
            onDelete: 'CASCADE',
            foreignKey: {
                field: 'course_id',
            },
        });
        model.hasMany(models.questions, {
            onDelete: 'CASCADE',
            foreignKey: {
                field: 'course_id',
            },
        });
        model.hasMany(models.userCourses, {
            onDelete: 'CASCADE',
            foreignKey: {
                field: 'course_id',
            },
        });
        model.belongsTo(models.subjects, {
            onDelete: 'CASCADE',
            foreignKey: {
                field: 'subject_id',
            },
        });
    };

    return model;
};
