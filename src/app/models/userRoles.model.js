module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('userRoles', {
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
        roleId: {
            type: Sequelize.INTEGER,
            field: 'role_id'
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
        tableName: 'user_roles',
    },
    );
    model.associate = (models) => {
        model.belongsTo(models.roles);
        model.belongsTo(models.users);
    };

    return model;
};

