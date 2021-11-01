module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('answers', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: Sequelize.STRING,
            field: 'user_id',
        },
        answer: {
            type: Sequelize.STRING,
            field: 'user_id',
        },
        lessonId: {
            type: Sequelize.STRING,
            field: 'lesson_id',
        },
        image: {
            type: Sequelize.STRING,
            field: 'image',
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
