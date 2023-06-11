const express = require('express')
const { signup, signin } = require('../controllers/auth.controller')

const router = express()

router.post("/register", signup);

router.post("/login", signin);

module.exports = router