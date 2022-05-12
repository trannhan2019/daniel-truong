const userController = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = require('express').Router();

//get all users
router.get(
  '/',
  authMiddleware.verifyToken,
  userController.getAllUsers
);

//delete user
router.delete(
  '/:id',
  authMiddleware.verifyTokenAndAdminAuth,
  userController.deleteUser
);

module.exports = router;
