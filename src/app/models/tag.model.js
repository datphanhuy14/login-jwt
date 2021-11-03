module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('tags', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            field: 'name'
        },
        entityType: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'entity_type'
        },
        entityId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            field: 'entity_id'
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
        tableName: 'tags',
    },
    );
    model.associate = (models) => {
    };

    return model;
};

