const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const authendication = require('./authendication/auth')
const authRoutes = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const projectRoutes = require('./routes/projectRoute');
const timelogRoutes = require('./routes/timelogRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const app = express();
const port = 3000|| process.env.port;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/projectmanagement')
    .then(() => console.log('Db Connected'))
    .catch(() => console.log('DB not connected'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', authendication, userRoutes);
app.use('/api/project', authendication, projectRoutes);
app.use('/api/timelog', authendication, timelogRoutes);
app.use('/api/dashboard', authendication, dashboardRoutes);

app.get((req, res) => {
    res.status(404).send('Not found');
});

app.listen(port, () => {
    console.log(`Server connected with port ${port}`);
});
