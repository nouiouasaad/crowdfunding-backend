
const multer = require('multer')
const path = require('path')
const moment = require('moment');

const db = require('../models')
const Project = db.Project

const addProject = async (req, res) => {
    
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    
    console.log(req.body);
    
    const data = {
        name: req.body.name,
        description: req.body.description,
        user_id: req.user.id,
        image: req.file.path,
        category: req.body.category,
        status: req.body.status,
        from_date: moment(req.body.from_date).format('YYYY-MM-DD'),
        to_date: moment(req.body.to_date).format('YYYY-MM-DD'),
        total_amount: req.body.total_amount,
        rest_amount: req.body.rest_amount,
        current_amount: req.body.current_amount,
    }
    
    Project.create(data)
    .then(project => {
        res.status(200).send(project)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Project."
        });
    })
}

const getAllProjects = async (req, res) => {

    Project.findAll({})
    .then(projects => {
        res.status(200).send(projects)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the Projects."
        });
    })

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