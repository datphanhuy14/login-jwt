module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('answers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        answer: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'user_id',
        },
        lessonId: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'lesson_id',
        },
        type: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'type',
        },
        media: {
            type: Sequelize.STRING,
            field: 'media',
        },
        questionId: {
            type: Sequelize.STRING,
            field: 'question_id',
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
        tableName: 'answers ',
    },
    );
    model.associate = (models) => {

    };
    return model;
};
