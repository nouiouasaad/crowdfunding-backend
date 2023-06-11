const express = require('express')
const project = require('../controllers/project.controller')

const router = express()

router.post('/create', project.upload, project.addProject)

module.exports = router