const db = require('../models');
const bcrypt = require( 'bcryptjs' );
const _ = require( 'lodash' );
const {helper} = require( '../helpers' );

const createUser = async ( req, res ) => {
  try {
    const check = await db.users.findOne( {where: {email: req.body.email}} );
    if ( check ) res.status( 401 ).json( {msg: 'email is valid'} );
    else {
      const createUser = await db.users.create( {
        ...req.body,
        password: bcrypt.hashSync( req.body.password, bcrypt.genSaltSync( 10 ) ),
      } );
      res.json( helper.formatOutputData( createUser, '{{common.success}}' ) );
    }
  } catch ( error ) {
    res.status( 400 ).json( {msg: error.message} );
  }
};
const list = async ( req, res ) => {
  const user = await db.user.findAll();
  const data = [];
  user.map( remove );
  function remove( _user ) {
    _user = _.omit( _user, ['password'] );
    data.push( _user );
  }
  res.json( helper.formatOutputData( data, '{{common.success}}' ) );
};
const list2 = async ( req, res ) => {
  const user = await db.users.findAll(
      {
        include: {
          model: db.roles,
        },
      },
      {raw: true},
  );

  const data = JSON.parse( JSON.stringify( user ) );
  data.forEach( ( element ) => {
    delete element.password;
  } );
  res.json( helper.formatOutputData( data, '{{common.success}}' ) );
};

module.exports = {
  list,
  createUser,
  list2,
};
