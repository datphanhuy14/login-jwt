import { database, username, password, host as _host, dialect as _dialect, pool as _pool } from '../config/db.config.js';
import { readdirSync } from 'fs';
import { basename as _basename, join } from 'path';
const basename = _basename(__filename);
import Sequelize, { DataTypes } from 'sequelize';
const sequelize = new Sequelize(
  database,
  username,
  password,
  {
    host: _host,
    dialect: _dialect,
    operatorsAliases: 0,

    pool: _pool,
    logging: false,
    raw: true,
  },
);

const db = {};
readdirSync(join(__dirname))
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(
      sequelize,
      DataTypes,
    );
    console.log(model.name);
    db[model.name] = model;
  });
Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

export default db;
