module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('answerLogs', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.UUID,
            field: 'user_id'
        },
        questionId: {
            type: Sequelize.INTEGER,
            field: 'question_id'
        },
        lessonId: {
            type: Sequelize.INTEGER,
            field: 'lesson_id'
        },
        turn: {
            type: Sequelize.STRING,
            field: 'turn',
        },
        submitAnswer: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'submit_answer'
        },
        active: {
            type: Sequelize.BOOLEAN,
            field: 'active',
            defaultValue: true
        },
        answer: {
            type: Sequelize.STRING,
            field: 'answer'
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
            tableName: 'answer_logs',
        },
    );
    model.associate = (models) => {
        //   AnswerLogs.hasMany(models.users);
    };
    return model;
};
