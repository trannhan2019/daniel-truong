const User = require('../models/User');
const bcrypt = require('bcrypt');

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //create User
      //c1
      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      //c2
      //   const newUser = await new User({
      //     username: req.body.username,
      //     email: req.body.email,
      //     password: hashed,
      //   });
      //   const user = await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  },
};

module.exports = authController;
