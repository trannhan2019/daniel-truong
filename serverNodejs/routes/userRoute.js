const userController = require("../controllers/userController");

const router = require("express").Router();

//get all users
router.get("/", userController.getAllUsers);

module.exports = router;
