module.exports = (sequelize, Sequelize) => {
  const Level = sequelize.define('levels', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    code: {
      type: Sequelize.STRING,
      field: 'code',
    },
    title: {
      type: Sequelize.STRING,
      field: 'title',
    },
    active: {
      type: Sequelize.BOOLEAN,
      field: 'active',
      defaultValue: true,
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
    tableName: 'levels',
  },
  );
  Level.associate = (models) => {
    Level.hasMany(models.courses);
  };
  return Level;
};

