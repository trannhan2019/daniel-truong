const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

  //login
  loginUser: async (req, res) => {
    try {
      const user = await User.findOne({
        username: req.body.username,
      });

      if (!user) {
        return res.status(404).json('Wrong username!');
      }

      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!validPassword) {
        res.status(404).json('Wrong password!');
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);

        const refreshToken =
          authController.generateRefreshToken(user);

        const { password, ...others } = user._doc;
        res
          .status(200)
          .json({ ...others, accessToken, refreshToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //generateAccessToken
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '2h' }
    );
  },
  //generateRefreshToken
  generateRefreshToken: (user) => {
    return jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: '365d' }
    );
  },
};

module.exports = authController;
