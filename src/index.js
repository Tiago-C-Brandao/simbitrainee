const express = require ('express');
const routes = require('./Routes/trainerRoute')
const database = require('./Database/db');

require("dotenv-safe").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(routes);

database.sync();

app.listen(3333);

console.log('Server running on port 3333');