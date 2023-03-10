// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const TrainerRespository = require('../Models/trainerModel');

//--------------------------------- GET ----------------------------------//

function findAll(req, res) {
    try{
        TrainerRespository.findAll().then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

function findTrainer(req, res) {
    try {
        TrainerRespository.findByPk(req.params.id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- POST -------------------------------//

function addTrainer(req, res) {
    try {
        TrainerRespository.create({
            trainer_name: req.body.trainer_name,
            trainer_email: req.body.trainer_email,
            password: req.body.password,
        }).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PUT ---------------------------------//

async function updateTrainer(req, res) {
    try {
        await TrainerRespository.update(
            {
                trainer_name: req.body.trainer_name,
                trainer_email: req.body.trainer_email,
                password: req.body.password,
            },
            {
                where: {
                    trainer_id: req.params.id,
                },
            }
        );
        TrainerRespository.findByPk(req.params.id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- DELETE -------------------------------//

async function deleteTrainer(req, res) {
    try {
        await TrainerRespository.destroy({
            where: {
                trainer_id: req.params.id,
            },
        });
    
        TrainerRespository.findAll().then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- EXPORT -----------------------------//

module.exports = {
    findAll,
    findTrainer,
    addTrainer,
    updateTrainer,
    deleteTrainer
}