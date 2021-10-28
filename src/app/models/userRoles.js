module.exports = (sequelize, Sequelize) => {
    const UserRole = sequelize.define('userRoles', {
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
    UserRole.associate = (models) => {
        UserRole.belongsTo(models.roles);
        UserRole.belongsTo(models.users);
    };

    return UserRole;
};

