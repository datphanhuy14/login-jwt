import models from '../models/';
module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define('lessons', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        content1: {
            type: Sequelize.STRING,
            field: 'content_1'
        },
        content2: {
            type: Sequelize.STRING,
            field: 'content_2'
        },
        content3: {
            type: Sequelize.STRING,
            field: 'content_3'
        },
        courseId: {
            type: Sequelize.INTEGER,
            field: 'course_id'
        },
        title: {
            type: Sequelize.STRING,
            field: 'title'
        },
        media: {
            type: Sequelize.STRING,
            field: 'media'
        },
        image: {
            type: Sequelize.STRING,
            field: 'image'
        },
        description: {
            type: Sequelize.STRING,
            field: 'image'
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
        tableName: 'lessons',
    },
    );
    Lesson.addScope('associated', (partition) => {
        {
            return {
                include: [
                    {
                        model: models.courses,
                    }
                ]
            };
        }
    });
    Lesson.associate = (models) => {
        Lesson.belongsTo(models.courses, { foreignKey: 'course_id' });
    };
    return Lesson;
};
