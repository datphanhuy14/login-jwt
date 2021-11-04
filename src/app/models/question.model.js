module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('questions', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        mediaType: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'media_type',
            validate: {
                isIn: {
                    args: [['pdf', 'video', 'audio','mix','image']],
                    msg: 'question.validation.mediaTypeIsNotValid'
                }
            }
        },
        type: {
            type : Sequelize.ENUM,
            values : ['mixMixture', 'wordFill', 'matching', 'correctAnswer'],
            defaultValue : 'mixMixture',
            field : 'type'
        },
        lessonId: {
            type: Sequelize.INTEGER,
            allowNull: true,
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
    model.associate = (models) => {
        // Question.hasMany(models.users);
    };
    return model;
};
