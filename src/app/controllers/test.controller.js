const debug = console.log.bind(console);
const db = require("../models");

let friendLists = (req, res) => {
  debug(`Xác thực token hợp lệ, thực hiện giả lập lấy danh sách bạn bè của user và trả về cho người dùng...`);
  // Lưu ý khi làm thực tế thì việc lấy danh sách này là query tới DB để lấy nhé. Ở đây mình chỉ mock thôi.
  const friends = [
    {
      name: "Cat: Russian Blue",
    },
    {
      name: "Cat: Maine Coon",
    },
    {
      name: "Cat: Balinese",
    },
  ];
  return res.status(200).json(friends);
}
let initDb =async (req,res) => {
  await db.roles.create({
    name: "user"
  });
 
  await db.roles.create({
    name: "moderator"
  });
 
  await db.roles.create({
    name: "admin"
  });
  await db.roles.create({
    name: "PROVIP"
  });
  await db.roles.create({
    name: "ALLLLLLL"
  });
  res.status(200).json({success: true});
}

module.exports = {
  friendLists,
  initDb
};