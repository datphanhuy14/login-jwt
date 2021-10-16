const config = require( '../config/db.config.js' );
const fs = require( 'fs' );
const path = require( 'path' );
const basename = path.basename( __filename );
const Sequelize = require( 'sequelize' );
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      host: config.host,
      dialect: config.dialect,
      operatorsAliases: 0,

      pool: config.pool,
      logging: false,
      raw: true,
    },
);

const db = {};
fs.readdirSync( path.join( __dirname ) )
    .filter( ( file ) => {
      return (
        file.indexOf( '.' ) !== 0 && file !== basename && file.slice( -3 ) === '.js'
      );
    } )
    .forEach( ( file ) => {
      const model = require( path.join( __dirname, file ) )(
          sequelize,
          Sequelize.DataTypes,
      );
      db[model.name] = model;
    } );
Object.keys( db ).forEach( function( modelName ) {
  if ( db[modelName].associate ) {
    db[modelName].associate( db );
  }
} );

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
