
const db = require('../models');
const bcrypt = require('bcryptjs');
const _ = require('lodash')


let createUser = async (req,res ) => {
    try {
      let check = await db.Users.findOne({
        where: {email :req.body.email}
      })
      if(check) return res.status(401).json({msg:"email valid"})
      let dataUser = {...req.body}
      console.log(dataUser);
      dataUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
      console.log(1);
      console.log("222",dataUser);
      // let createUser = await db.user.create(dataUser);
      let createU2 = await db.Users.findOrCreate({where: {email: req.body.email}, defaults: dataUser})
      console.log(2)
      let createUserRole = await db.userRole.create({roleId: req.body.roleId , userId: createU2.id})
      console.log(3)
      res.json({createU2,createUserRole})
    } catch (error) {
      res.status(400).json({msg: error.message})  
    }
  }
  let list  = async (req,res) => {
    let user = await db.Users.findAll({raw:true}
    )
    let data =[]
    user.map(remove)
    function remove(_user) {
      _user =_.omit(_user, ['password'])
      data.push(_user)
    }
    res.json(data)
  }
  let list2  = async (req,res) => {
    let user = await db.Users.findAll({
      include: {
        model: db.Role
      }
    },
      {raw:true}
    )
    let data =[]
    user.map(remove)
    function remove(_user) {
      _user =_.omit(_user, ['password'])
      data.push(_user)
    }
    res.json(data)
  }

  module.exports ={
      list,createUser,list2
  }