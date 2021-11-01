module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('roles', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        permission: {
            type: Sequelize.STRING,
            field: 'permission',
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
        tableName: 'roles',
    },
    );
    model.associate = (models) => {
        model.hasMany(models.userRoles, {
            onDelete: 'CASCADE',
            foreignKey: {
                field: 'role_id',
            },
        });
    };
    return model;
};
