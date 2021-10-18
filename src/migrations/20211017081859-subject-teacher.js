// /* eslint-disable no-unused-vars */
// 'use strict';

// module.exports = {
//   up: (migration, DataTypes) => {
//     return migration.createTable('teacher_subjects', {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         unique: true,
//         autoIncrement: true,
//       },
//       teacherId: {
//         type: DataTypes.UUID,
//         field: 'teacher_id',
//       },
//       subjectId: {
//         type: DataTypes.INTEGER,
//         field: 'subject_id',
//       },
//       createdAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         field: 'created_at',
//       },
//       updatedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         field: 'updated_at',
//       },
//     });
//   },
//   down: (migration, DataTypes) => {
//     return migration.dropTable('teacher_subjects');
//   },
// };
