const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require('../models')
const { createProfile } = require('../controllers/user.controller');

const User = db.User;
const Role = db.Role;
const UserProfile = db.UserProfile;

const signup = async (req, res) => {

    let role = await Role.findOne({ where: { name: 'Creator' } });

    const data = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        user_name: req.body.userName,
        email: req.body.email,
        role_id: role.id,
        password: bcrypt.hashSync(req.body.password, 8)
    };

    try {
        const user = await User.create(data)
        createProfile(user.id)
        signin(req, res)
    } catch (error) {

    }

};

const signin = async (req, res) => {
    try {
        const user = await User.findOne({ where: { email: req.body.email }, include: { all: true } });
        const userProfile = await UserProfile.findOne({ where: { user_id: user.id }, include: { all: true } });

        if (!user)
            res.status(404).send({ message: "Not found user with email " + req.body.email });

        if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(401)
                .send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
        }

        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: 86400
            });

        res.status(200)
            .send({
                user: user,
                userProfile: userProfile,
                message: "Login successfull",
                accessToken: token,
            });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving user " + error
        });
    }
};

const authenticate = async (req, res, next) => {
    try {
        const token = await req.headers.authorization.split(" ")[1];

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await decodedToken;

        req.user = user;

        next();

    } catch (error) {
        res.status(401).send({
            message: "Invalid request! " + error
        });
    }
};


module.exports = {
    signup,
    signin,
    authenticate
}