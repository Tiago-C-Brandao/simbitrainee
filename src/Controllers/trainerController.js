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
    const { trainer_id } = req.params

    try {
        TrainerRespository.findByPk(trainer_id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- POST -------------------------------//

function addTrainer(req, res) {
    const { trainer_name, trainer_email, password } = req.body
    try {
        TrainerRespository.create({
            trainer_name: `${trainer_name.toUpperCase()}`, 
            trainer_email, password,
        }).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PUT ---------------------------------//

async function updateTrainer(req, res) {
    const { trainer_id } = req.params
    const { trainer_name, trainer_email, password } = req.body

    try {
        await TrainerRespository.update(
            {
                trainer_name: `${trainer_name.toUpperCase()}`, 
                trainer_email, password,
            },
            {
                where: {
                    trainer_id,
                },
            }
        );
        TrainerRespository.findByPk(trainer_id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- DELETE -------------------------------//

async function deleteTrainer(req, res) {
    const { trainer_id } = req.params
    try {
        await TrainerRespository.destroy({
            where: {
                trainer_id,
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