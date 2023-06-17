const express = require('express')
const project = require('../controllers/project.controller')
const auth = require('../controllers/auth.controller')

const router = express()

router.post('/create', auth.authenticate, project.upload, project.addProject)
router.post('/invest/:id', project.invest)
router.get('/', project.getAllProjects)
router.get('/:id', project.getProjectById)

module.exports = router