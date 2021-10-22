module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define('roles', {
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
      tableName: 'roles',
    },
  );
  Role.associate = (models) => {
    Role.hasMany(models.users);
  };
  return Role;
};
