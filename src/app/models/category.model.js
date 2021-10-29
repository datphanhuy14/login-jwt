module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            field: 'name',
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
        tableName: 'categories',
    },
    );
    Category.associate = (models) => {
        // Category.hasMany(models.lessonsCategories, {
        //     onDelete: 'CASCADE',
        //     through : 'lessons_categories',
        //     foreignKey: {
        //         field: 'category_id',
        //     },
        // });
        Category.hasMany(models.lessonsCategories,{foreignKey: 'category_id'});

    };
    return Category;
};
