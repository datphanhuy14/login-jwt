
// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
    const TeacherSubject = sequelize.define(
        "teacherSubjects",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                unique: true,
                autoIncrement: true,
            },
            teacherId: {
                type: Sequelize.UUID,
                field: 'teacher_id',
            },
            subjectId: {
                type: Sequelize.INTEGER,
                field: 'subject_id',
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
            tableName: "teacher_subjects",
        }
    );
    return TeacherSubject;
};
