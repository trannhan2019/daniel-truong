const User = require('../models/User');

const userController = {
  //get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //delete user
  deleteUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      res.status(200).json('Delete success fully!');
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
