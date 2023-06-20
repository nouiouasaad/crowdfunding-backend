const db = require('../models')
const bcrypt = require("bcryptjs");
const { signin } = require('./auth.controller');

const User = db.User;
const UserProfile = db.UserProfile;

const createProfile = async (userId) => {
    UserProfile.create({ user_id: userId }).then(profile => { }).catch(err => { })
};

const updateProfile = async (req, res) => {
    const id = req.params.userId;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    try {
        const profile = await UserProfile.findOne({ where: { user_id: id } })
        const user = await User.findOne({ where: { id: id } })

        if (profile) {
            profile.phone_number = req.body.phoneNumber
            profile.image = req.file.filename
            profile.facebook_link = req.body.fbLink
            profile.linkedIn_link = req.body.linkedInLink
        }

        if (user) {
            user.user_name = req.body.userName
            user.first_name = req.body.firstName
            user.last_name = req.body.lastName
            user.email = req.body.email
            user.password = bcrypt.hashSync(req.body.password, 8)
        }

        try {
            await user.save()
            await profile.save()
            signin(req, res)
        } catch (error) {

        }

    } catch (error) {

    }
};

const getUserById = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const userProfile = await UserProfile.findOne({ where: { user_id: id }, include: { all: true } });

    User.findOne(
        {
            where: { id: id },
            include: [{ model: UserProfile }]
        }
    ).then(user => {
        res.status(200).send({
            user: user,
            userProfile: userProfile
        })
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