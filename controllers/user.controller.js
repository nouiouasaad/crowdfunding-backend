const db = require('../models')

const User = db.User;
const UserProfile = db.UserProfile;

const createProfile = async (userId) => {
    UserProfile.create({ user_id: userId }).then(profile => { }).catch(err => { })
};

const updateProfile = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    UserProfile.findOne(
        {
            where: { user_id: id },
        }
    ).then(profile => { 
        if (profile) {
            profile.phone_number = req.body.phoneNumber
            profile.image = req.file.filename
            profile.facebook_link = req.body.fbLink
            profile.linkedIn_link = req.body.linkedInLink

            profile.save()
                .then(profile => {
                    res.status(200).send(profile)
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
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    User.find(
        {
            where: { id: id },
            include: [{ model: UserProfile }]
        }
    ).then(user => { 
        res.status(200).send(user)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the Projects."
        });
     })
};

const getAllUsers = async (req, res) => {
    User.findAll({ include: { all: true } })
    .then(users => { 
        res.status(200).send(users)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while fetching the Projects."
        });
     })
};

module.exports = {
    createProfile,
    updateProfile,
    getUserById,
    getAllUsers
}