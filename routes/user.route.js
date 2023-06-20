const express = require('express')
const { signup, signin } = require('../controllers/auth.controller')
const upload = require('../middlewares/upload')
const { updateProfile, getUserById, getAllUsers } = require('../controllers/user.controller')

const router = express()

router.post("/register", signup);
router.post("/login", signin);
router.post("/updateProfile/:userId", upload, updateProfile);

router.get("/userId/:id", getUserById);
router.get("/", getAllUsers);

module.exports = router