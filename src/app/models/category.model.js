module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('categories', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'name',
        },
        type : {
            type: Sequelize.STRING,
            allowNull: true,
            field: 'type'
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
    model.associate = (models) => {
        // Category.hasMany(models.lessonsCategories, {
        //     onDelete: 'CASCADE',
        //     through : 'lessons_categories',
        //     foreignKey: {
        //         field: 'category_id',
        //     },
        // });
        model.hasMany(models.lessonsCategories,{foreignKey: 'category_id'});

    };
    return model;
};
