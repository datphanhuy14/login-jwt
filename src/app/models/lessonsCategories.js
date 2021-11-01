module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('lessonsCategories', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        lessonId: {
            type: Sequelize.INTEGER,
            field: 'lesson_id'
        },
        categoryId: {
            type: Sequelize.INTEGER,
            field: 'category_id'
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
        tableName: 'lessons_categories',
    },
    );
    model.associate = (models) => {
        model.belongsTo(models.lessons);
        model.belongsTo(models.categories);
    };

    return model;
};

