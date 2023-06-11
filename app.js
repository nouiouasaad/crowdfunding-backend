const express = require('express');
const cors = require('cors')

const userRoutes = require("./routes/user.route");
const projectRoutes = require("./routes/project.route");

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/users', userRoutes);

app.use('/Images', express.static('./Images'))

module.exports = app;