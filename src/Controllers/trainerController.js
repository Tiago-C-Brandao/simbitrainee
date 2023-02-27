// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const TrainerRespository = require('../Models/treinerModel');

//--------------------------------- GET ----------------------------------//

function findAll(req, res) {
    TrainerRespository.findAll().then((result) => res.json(result));
}

function findTrainer(req, res) {
    TrainerRespository.findByPk(req.params.id).then((result) => res.json(result));
}

//---------------------------------- POST -------------------------------//

function addTrainer(req, res) {
    TrainerRespository.create({
        trainer_name: req.body.trainer_name,
        trainer_email: req.body.trainer_email,
        password: req.body.password
    }).then((result) => res.json(result));
}

//------------------------------------- EXPORT -----------------------------//

module.exports = {
    findAll,
    findTrainer,
    addTrainer
}