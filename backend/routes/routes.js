const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/login", authController.postLogin);
router.get("/user", authController.getUser);
router.post("/createuser", authController.createUser);
router.put("/edit", authController.editUser);
router.post("/delete", authController.deleteUser);
router.get("/users", authController.allUsers);

module.exports = router;