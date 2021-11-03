module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('tags', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        lessonId: {
            type: Sequelize.INTEGER,
            field: 'lesson_id'
        },
        courseId: {
            type: Sequelize.INTEGER,
            field: 'course_id'
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
        tableName: 'tags',
    },
    );
    model.associate = (models) => {
    };

    return model;
};

