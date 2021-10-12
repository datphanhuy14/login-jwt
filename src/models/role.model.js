module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("Roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        field: 'name'
      },
      description: {
        type: Sequelize.STRING,
        field: 'description'
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
      tableName: 'roles'
  }
    );
    
  
    return Role;
  };