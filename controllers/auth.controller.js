const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../models')

const User = db.user;

const signup = async (req, res) => {

    const data = {
        user_name: req.body.user_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    };

    console.log(data);
    try {
        const user = await User.create(data)
        res.status(200).send(user)
    } catch (error) {
        res.status(500).send({
            message:
                err.message || "Some error occurred while creating the User."
        });
    }
};

const signin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email } });

        if (!user)
            res.status(404).send({ message: "Not found user with email " + req.body.email });

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401)
                .send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET, {
            expiresIn: 86400
        });

        res.status(200)
            .send({
                user: {
                    id: user._id,
                    email: user.email,
                    fullName: user.fullName,
                },
                message: "Login successfull",
                accessToken: token,
            });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving user " + error
        });
    }
};

module.exports = {
    signup,
    signin
}