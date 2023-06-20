
const moment = require('moment');
const { Op } = require("sequelize");
const constant = require('../constants/Constants')
const db = require('../models');

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

const getAllContrubutions = (req, res) => {

    Contrubution.findAll({ include: { all: true } })
        .then(contrubutions => {
            res.status(200).send(contrubutions)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getContrubutionsByProjectId = (req, res) => {

    Contrubution.findAll({
        where: { project_id: req.params.id },
        include: { all: true }
    })
        .then(contrubutions => {
            res.status(200).send(contrubutions)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getAllProjects = (req, res) => {

    Project.findAll({
        include: { all: true }
    })
        .then(projects => {
            res.status(200).send(projects)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getApprovedProjects = (req, res) => {

    Project.findAll({
        where: {
            [Op.or]: [
                { status: constant.status.Completed },
                { status: constant.status.approved }
            ]
        },
        include: { all: true }
    })
        .then(projects => {
            res.status(200).send(projects)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getProjectsByUserId = (req, res) => {

    Project.findAll({
        where: { user_id: req.params.userId },
        include: { all: true }
    })
        .then(projects => {
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
            include: { all: true },
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

const deleteProjectById = (req, res) => {

    const id = req.params.id;

    Project.destroy(
        {
            where: { id: id },
        }
    )
        .then(() => {
            res.status(200).send(id)
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

const approveProject = (req, res) => {

    const id = req.params.id;

    Project.findOne(
        {
            where: { id: id },
        }
    )
        .then(project => {
            if (project) {
                project.status = constant.status.approved

                project.save()
                    .then(project => {
                        res.status(200).send(project)
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while fetching the Projects."
                        });
                    })
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const cancelProject = (req, res) => {

    const id = req.params.id;

    Project.findOne(
        {
            where: { id: id },
        }
    )
        .then(project => {
            if (project) {
                project.status = constant.status.canceled

                project.save()
                    .then(project => {
                        res.status(200).send(project)
                    })
                    .catch(err => {
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while fetching the Projects."
                        });
                    })
            }
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getProjectsByCategoryId = (req, res) => {

    const id = req.params.id;

    Project.findAll({
        where: { category_id: id },
        include: { all: true }
    })
        .then(projects => {
            res.status(200).send(projects)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

const getAllCategories = (req, res) => {

    const id = req.params.id;

    Category.findAll({
        include: { all: true }
    })
        .then(categories => {
            res.status(200).send(categories)
        }).catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while fetching the Projects."
            });
        })

}

module.exports = {
    addProject,
    getAllProjects,
    getProjectById,
    invest,
    getAllContrubutions,
    approveProject,
    cancelProject,
    deleteProjectById,
    getContrubutionsByProjectId,
    getApprovedProjects,
    getProjectsByUserId,
    getProjectsByCategoryId,
    getAllCategories
}