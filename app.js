const express = require('express');
const cors = require('cors')

const userRoutes = require("./routes/user.route");
const projectRoutes = require("./routes/project.route");
const auth = require('./controllers/auth.controller')

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/projects', auth.authenticate, projectRoutes);

app.use('/Images', express.static('./Images'))

module.exports = app;