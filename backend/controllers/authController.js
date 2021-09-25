const bcrypt = require("bcryptjs");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");

let loadedUser;
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password)

  try {
    const user = await userModel.findOne({ email: email });
    console.log(user);
    
    if (!user) {
      const error = new Error("user with this email not found!");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;

    const comparePassword = bcrypt.compare(password, user.password);
    console.log(comparePassword)

    if (!comparePassword) {
      const error = new Error("password is not match!");
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign({ email: loadedUser.email }, "expressnuxtsecret", {
      expiresIn: "20m", // it will expire token after 20 minutes and if the user then refresh the page will log out
    });
    res.status(200).json({ token: token });
  } catch (err) {
    if (!err.statusCode) {
      console.log(err)
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getUser = async (req, res, next) => { // this function will send user data to the front-end as I said above authFetch on the user object in nuxt.config.js will send a request and it will execute
  try {
    const users = await userModel.find();
    if(!users) {
      const error = new Error("Data does not exist");
      error.statusCode = 401;
      throw error;
    }
    console.log(users)
    res.status(200).json({user: users});
  }catch(err) {
    console.log(err);
  }
};

exports.createUser = async (req, res, next) => {
  const {fullname, email, password } = req.body;
  try {
    const user = new userModel({fullname: fullname, email: email, password: password});
    user.save( function(err) {
      if(err) {
        const error = new Error("Creating Data failed");
        error.statusCode = 401;
        throw error;
      }
    })
    res.status(200).json("Successfully Created")
  }catch(err) {
    console.log(err)
  }
}