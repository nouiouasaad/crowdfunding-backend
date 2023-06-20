const express = require('express')
const project = require('../controllers/project.controller')
const auth = require('../controllers/auth.controller')
const upload = require('../middlewares/upload')

const router = express()

router.post('/create', auth.authenticate, upload, project.addProject)
router.post('/invest/:id', project.invest)
router.post('/approve/:id', project.approveProject)
router.post('/cancel/:id', project.cancelProject)

router.get('/', project.getAllProjects)
router.get('/y', project.getAllCategories)
router.get('/category/:id', project.getProjectsByCategoryId)
router.get('/approved', project.getApprovedProjects)
router.get('/myProjects/:userId', project.getProjectsByUserId)
router.get('/:id', project.getProjectById)
router.delete('/:id', project.deleteProjectById)

router.get('/contrubution', project.getAllContrubutions)
router.get('/contrubution/:id', project.getContrubutionsByProjectId)

module.exports = router