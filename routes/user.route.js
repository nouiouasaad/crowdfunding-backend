const express = require('express')
const { signup, signin } = require('../controllers/auth.controller')
const { updateProfile, getUserById, getAllUsers } = require('../controllers/user.controller')

const router = express()

router.post("/register", signup);
router.post("/login", signin);
router.post("/:id", updateProfile);
router.get("/userId/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router