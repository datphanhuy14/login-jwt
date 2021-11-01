module.exports = (sequelize, Sequelize) => {
    const model = sequelize.define('userCourses', {
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
        type: {
            type: Sequelize.STRING,
            field: 'type',
            isIn: {
                args: [['Student', 'Teacher']],
                msg: 'userCourse.validation.typeInvalid'
            },
        },
        createdAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "created_at",
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            field: "updated_at",
        },
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'user_courses',
    },
    );
    model.associate = (models) => {
        model.belongsTo(models.courses, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: true,
            },
        });
    // userCourse.belongsToMany(models.users, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     field: "user_id",
    //     allowNull: true,
    //   },
    // });
    // User.belongsToMany(models.subjects, { through: "teacher_subjects", foreignKey: 'teacher_id' });
    };
    return model;
};
