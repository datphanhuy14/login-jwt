module.exports = (sequelize, Sequelize) => {
  const Rate = sequelize.define('rates', {
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
    courseId: {
      type: Sequelize.INTEGER,
      field: 'course_id'
    },
    rating: {
      type: Sequelize.INTEGER,
      validate: {
        isIn: {
          args: [[1, 2, 3, 4, 5]],
          msg: 'rating.validation.mustBeBetween1To5'
        },
      },
      field: 'rating',

    },
    description: {
      type: Sequelize.STRING,
      field: 'description',
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
      tableName: 'rates',
    },
  );
  Rate.associate = (models) => {
    Rate.belongsTo(models.courses);
    Rate.belongsTo(models.users);
  };

  return Rate;
};

