const { uuidPrimaryKey } = require("../helpers");
import models from '../models';
// const db = require("../models");
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "users",
        {
            id: uuidPrimaryKey(),
            facebookId: {
                type: Sequelize.STRING,
                allowNull: true,
                field: "facebook_id",
            },
            googleId: {
                type: Sequelize.STRING,
                allowNull: true,
                field: "google_id",
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false,
                field: 'fullname'
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                validate: {
                    isEmail: {
                        args: true,
                        msg: "user.validate.invalidEmail"
                    }
                }
            },
            password: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            tel: {
                type: Sequelize.INTEGER,
                allowNull: true,
                field: 'tel'
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'avatar'
            },
            dateOfBirth: {
                type: Sequelize.DATE,
                allowNull: true,
                field: 'date_of_birth'
            },
            displayName: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'display_name'
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                field: "role_id",
                defaultValue: 0,
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
            tableName: "users",
        }
    );
    User.addScope('associated', (partition) => {
        {
            return {
                include: [
                    {
                        model: models.roles,
                    },
                    {
                        model: models.rates
                    }
                ]
            };
        }
    });
    User.associate = (models) => {
        User.belongsTo(models.roles, {
            onDelete: "CASCADE",
            foreignKey: {
                filed: 'role_id',
            },
        });
        User.hasMany(models.rates, { foreignKey: 'user_id' });
    };
    return User;
};
