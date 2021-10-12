const db = require("../models");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

let createUser = async (req, res) => {
  try {
    let check = await db.Users.findOne({ where: { email: req.body.email } });
    if (check) res.status(401).json({ msg: "email is valid" });
    else {
      let createUser = await db.Users.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
      });
      let createUserRole = await db.userRoles.create({
        roleId: req.body.roleId,
        userId: createUser.id,
      });
      res.json({ createUser, createUserRole });
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
let list = async (req, res) => {
  let user = await db.Users.findAll({ raw: true });
  let data = [];
  user.map(remove);
  function remove(_user) {
    _user = _.omit(_user, ["password"]);
    data.push(_user);
  }
  res.json(data);
};
let list2 = async (req, res) => {
  let user = await db.Users.findAll(
    {
      include: {
        model: db.Role,
      },
    },
    { raw: true }
  );
  let data = [];
  user.map(remove);
  function remove(_user) {
    _user = _.omit(_user, ["password"]);
    data.push(_user);
  }
  res.json(data);
};

module.exports = {
  list,
  createUser,
  list2,
};
