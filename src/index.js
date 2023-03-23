const express = require ('express');
const routeTrainer = require('./Routes/trainerRoute');
const routeMember = require('./Routes/memberRoute');

require("dotenv-safe").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routeTrainer, routeMember);

app.listen(3333);

console.log('Server running on port 3333');