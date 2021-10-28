module.exports = (sequelize, Sequelize) => {
    const Question = sequelize.define('questions', {
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
        lessonId: {
            type: Sequelize.INTEGER,
            field: 'lesson_id'
        },
        content: {
            type: Sequelize.STRING,
            field: 'content',
        },
        title: {
            type: Sequelize.STRING,
            field: 'title',
        },
        image: {
            type: Sequelize.STRING,
            field: 'image'
        },
        active: {
            type: Sequelize.BOOLEAN,
            field: 'active',
            defaultValue: true
        },
        media: {
            type: Sequelize.STRING,
            field: 'media'
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
        tableName: 'questions',
    },
    );
    Question.associate = (models) => {
        // Question.hasMany(models.users);
    };
    return Question;
};
