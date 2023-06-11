const db = require('../models')

const multer = require('multer')
const path = require('path')

const Project = db.project

const addProject = async (req, res) => {

    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const data = {
        image: req.file.path,
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        status: req.body.status,
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        total_amount: req.body.total_amount
    }

    try {
        const project = await Project.create(data)
        res.status(200).send(project)
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Project."
        });
    }
}

const getAllProjects = async (req, res) => {

    try {
        const projects = await Project.findAll({})
        res.status(200).send(projects)
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the Projects."
        });
    }

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Images')
    },
    filename: (req, file, cb) => {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if(mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = {
    addProject,
    getAllProjects,
    upload
}