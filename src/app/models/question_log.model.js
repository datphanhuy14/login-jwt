module.exports = (sequelize, Sequelize) => {
    const QuestionLogs = sequelize.define('questionLogs', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        type: {
            type: Sequelize.STRING,
            field: 'type'
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
        content: {
            type: Sequelize.STRING,
            field: 'content',
        },
        turn: {
            type: Sequelize.STRING,
            field: 'turn',
        },
        submit_answer: {
            type: Sequelize.STRING,
            field: 'image'
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
            tableName: 'question_logs',
        },
    );
    QuestionLogs.associate = (models) => {
        //   QuestionLogs.hasMany(models.users);
    };
    return QuestionLogs;
};
