const db = require("../models");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const userEntity = require("../entities/user.entity");

let createUser = async (req, res) => {
  try {
    let check = await db.users.findOne({ where: { email: req.body.email } });
    if (check) res.status(401).json({ msg: "email is valid" });
    else {
      let createUser = await db.users.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      });
      res.json({ createUser });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
let list = async (req, res) => {
  let user = await userEntity.list();
  let data = [];
  user.map(remove);
  function remove(_user) {
    _user = _.omit(_user, ["password"]);
    data.push(_user);
  }
  res.json(data);
};
let list2 = async (req, res) => {
  let user = await db.users.findAll(
    {
      include: {
        model: db.roles,
      },
    },
    { raw: true }
  );
    
  const data = JSON.parse(JSON.stringify(user));
  data.forEach(element => {
      delete element.password
  });
  
  // delete data.password;
  // let data = [];
  // user.map(remove);
  // function remove(_user) {
  //   _user = _.omit(_user, ["password"]);
  //   data.push(_user);
  // }
  res.json(data);
};

module.exports = {
  list,
  createUser,
  list2,
};
