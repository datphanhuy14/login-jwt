module.exports = (sequelize, Sequelize) => {
    const userRoles = sequelize.define("userRoles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        field: 'role_id'
      },
      userId: {
        type: Sequelize.STRING,
        field: 'user_id'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'created_at'
    },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'updated_at'
    }
    },
    {
        timestamps: true,
        underscored: true,
        tableName: 'user_roles'
    });
    
  
    return userRoles;
  };