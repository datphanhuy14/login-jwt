import { users, user as __user, roles } from '../models';
import { hashSync, genSaltSync } from 'bcryptjs';
import { omit } from 'lodash';
import { helper } from '../helpers';

const createUser = async ( req, res ) => {
  try {
    const check = await users.findOne( {where: {email: req.body.email}} );
    if ( check ) res.status( 401 ).json( {msg: 'email is valid'} );
    else {
      const createUser = await users.create( {
        ...req.body,
        password: hashSync( req.body.password, genSaltSync( 10 ) ),
      } );
      res.json( helper.formatOutputData( createUser, '{{common.success}}' ) );
    }
  } catch ( error ) {
    res.status( 400 ).json( {msg: error.message} );
  }
};
const list = async ( req, res ) => {
  const user = await __user.findAll();
  const data = [];
  user.map( remove );
  function remove( _user ) {
    _user = omit( _user, ['password'] );
    data.push( _user );
  }
  res.json( helper.formatOutputData( data, '{{common.success}}' ) );
};
const list2 = async ( req, res ) => {
  const user = await users.findAll(
      {
        include: {
          model: roles,
        },
      },
      {raw: true},
  );

  const data = JSON.parse( JSON.stringify( user ) );
  data.forEach( ( element ) => {
    delete element.password;
  } );

  // delete data.password;
  // let data = [];
  // user.map(remove);
  // function remove(_user) {
  //   _user = _.omit(_user, ["password"]);
  //   data.push(_user);
  // }
  res.json( helper.formatOutputData( data, '{{common.success}}' ) );
};

export {
  list,
  createUser,
  list2,
};
