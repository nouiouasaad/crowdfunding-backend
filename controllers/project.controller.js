
const multer = require('multer')
const path = require('path')
const moment = require('moment');
const constant = require('../constants/Constants')
const db = require('../models');
const { log } = require('console');

const Project = db.Project
const Category = db.Category
const User = db.User
const Contrubution = db.Contrubution

const addProject = (req, res) => {

    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const data = {
        name: req.body.name,
        description: req.body.description,
        user_id: req.user.id,
        image: req.file.filename,
        category_id: req.body.categoryId,
        status: req.body.status ?? constant.status.pending,
        from_date: moment(req.body.startDate.startDate).format('YYYY-MM-DD'),
        to_date: moment(req.body.endDate.endDate).format('YYYY-MM-DD'),
        total_amount: req.body.amount,
        rest_amount: 0,
        current_amount: 0,
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

const invest = (req, res) => {

    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const data = {
        project_id: id,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
        phone_number: req.body.phoneNumber,
        contrubution: req.body.contrubution,
        name_on_card: req.body.nameOnCard,
        exp_date: moment(req.body.expDate.expDate).format('YYYY-MM-DD'),
        card_number: req.body.cardNumber,
        security_number: req.body.securityNumber,
    }

    Contrubution.create(data)
        .then(contrubution => {
            updateProjectAmount(id, req.body.contrubution)
            res.status(200).send(contrubution)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Project."
            });
        })
}

const getAllProjects = (req, res) => {

    Project.findAll({ include: [{ model: Category }] })
        .then(projects => {
            console.log(projects);
            res.status(200).send(projects)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getProjectById = (req, res) => {

    const id = req.params.id;

    Project.findOne(
        {
            where: { id: id },
            include: [{ model: Category }, { model: User }],
        }
    )
        .then(project => {
            res.status(200).send(project)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const updateProjectAmount = (id, amount) => {

    Project.findOne(
        {
            where: { id: id },
        }
    )
        .then(project => {
            if (project) {
                project.current_amount = project.current_amount + parseFloat(amount)
                project.rest_amount = project.total_amount - project.current_amount

                project.save()
                    .then(project => {
                        
                    })
                    .catch(err => {
                        
                    })
            }
        }).catch(err => {
            
        })

}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
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

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('file')

module.exports = {
    addProject,
    getAllProjects,
    getProjectById,
    invest,
    upload
}