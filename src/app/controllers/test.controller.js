const debug = console.log.bind( console );
import { roles } from '../models';

const friendLists = ( req, res ) => {
  debug(
      `Xác thực token hợp lệ, thực hiện giả lập
       lấy danh sách bạn bè của user và trả về cho người dùng...`,
  );
  const friends = [
    {
      name: 'Cat: Russian Blue',
    },
    {
      name: 'Cat: Maine Coon',
    },
    {
      name: 'Cat: Balinese',
    },
  ];
  return res.status( 200 ).json( friends );
};
const initDb = async ( req, res ) => {
  await roles.create( {
    name: 'user',
  } );

  await roles.create( {
    name: 'moderator',
  } );

  await roles.create( {
    name: 'admin',
  } );
  await roles.create( {
    name: 'PROVIP',
  } );
  await roles.create( {
    name: 'ALLLLLLL',
  } );
  res.status( 200 ).json( {success: true} );
};

export {
  friendLists,
  initDb,
};
