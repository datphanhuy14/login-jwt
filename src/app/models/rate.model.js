module.exports = (sequelize, Sequelize) => {
  const Rate = sequelize.define('rates', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.STRING,
      field: 'user_id',
    },
    subjectId: {
      type: Sequelize.STRING,
      field: 'subject_id',
    },
    rating: {
      type: Sequelize.BOOLEAN,
      field: 'rating',
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
      tableName: 'rating',
    },
  );
  Rate.associate = (models) => {
    Rate.hasOne(models.subjects);
    Rate.hasOne(models.users);
  };

  return Rate;
};

