const jwt = require('jsonwebtoken');

const authMiddleware = {
  //verifyToken
  verifyToken: (req, res, next) => {
    const token = req.headers.token;
    if (token) {
      //Bearer 12345 -> accessToken: 12345
      const accessToken = token.split(' ')[1];
      jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_KEY,
        (err, user) => {
          if (err) {
            //console.log(err);
            return res.status(403).json('Token is not valid');
          }
          req.user = user;
          next();
        }
      );
    } else {
      res.status(401).json('You are not authenticated');
    }
  },
  //check del: user id = id || isAdmin next
  verifyTokenAndAdminAuth: (req, res, next) => {
    authMiddleware.verifyToken(req, res, () => {
      if (req.user.id == req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You're not allowed to delete other");
      }
    });
  },
};

module.exports = authMiddleware;
