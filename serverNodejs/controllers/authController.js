const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//luu refreshToken de tranh trung lap
//thuong luu vao REDIS
//bai nay tao array de luu
let refreshTokens = [];

const authController = {
  //register
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);
      //create User

      const user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
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
        return res.status(404).json('Wrong password!');
      }

      if (user && validPassword) {
        const accessToken = authController.generateAccessToken(user);

        const refreshToken =
          authController.generateRefreshToken(user);
        refreshTokens.push(refreshToken);

        res.cookie('refreshToken', refreshToken, {
          httpOnly: true,
          secure: false, //deloy set true
          path: '/',
          sameSite: 'strict',
          // sameSite: 'None',
          // domain: 'http://localhost:3000/',
        });

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, accessToken });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //logout
  logoutUser: async (req, res) => {
    res.clearCookie('refreshToken');
    refreshTokens = refreshTokens.filter(
      (token) => token !== req.cookies.refreshToken
    );
    res.status(200).json('Logged out !');
  },

  requestRefreshToken: async (req, res) => {
    //take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res
        .status(401)
        .json("You're not authenticated by not refreshToken");
    if (!refreshTokens.includes(refreshToken))
      return res.status(403).json('refresh token is not valid');
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_KEY,
      (err, user) => {
        if (err) {
          console.log(err);
        }
        //loai refresh token cu ra
        refreshTokens = refreshTokens.filter(
          (token) => token !== refreshToken
        );
        //create new accessToken, refressToken
        const newAccessToken =
          authController.generateAccessToken(user);
        const newRefreshToken =
          authController.generateRefreshToken(user);
        refreshTokens.push(newRefreshToken);
        //set cookies
        res.cookie('refreshToken', newRefreshToken, {
          httpOnly: true,
          secure: false, //deloy set true
          path: '/',
          sameSite: 'strict',
        });
        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  },

  //generateAccessToken
  generateAccessToken: (user) => {
    return jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: '20h' }
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

  //
};

module.exports = authController;

//CÁC CÁCH LƯU KEY Ở CLIENT
//1. LOCAL STORAGE: DỄ BỊ TẤN CÔNG XSS
//2. COOKIES || HTTPONLY COOKIES: TẤN CÔNG CSRF CÓ THỂ SỬ DỤNG SAMESITE ĐỂ PHÒNG TRÁNH
//3. SỬ DỤNG REDUX STORE ĐỂ LƯU ACCESSTOKEN, HTTPONLY COOKIES ĐỂ LƯU REFRESSTOKEN

//BONUS CÁCH HIỆU QUẢ: BFF PATTEN (BACKEND FOR FRONTEND)
