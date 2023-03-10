// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const MemberRespository = require('../Models/memberModel');
const TrainerRespository = require('../Models/trainerModel');

//--------------------------------- GET ----------------------------------//

function findAll(req, res) {
    try {
        MemberRespository.findAll().then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- POST -------------------------------//

async function addMember(req, res) {
    try {
        await MemberRespository.create(
            {
                member_name: req.body.member_name,
                member_email: req.body.member_email,
                password: req.body.password,
                trainer_id: req.params.id
            }, 
            {
                where: {
                    trainer_id: req.params.id,
                }
            }
        ).then((result) => res.status(200).json(result));
        TrainerRespository.findByPk(req.params.id)
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PUT ---------------------------------//

async function updateMember(req, res) {
    try {
        await MemberRespository.update(
            {
                member_name: req.body.member_name,
                member_email: req.body.member_email,
                password: req.body.password,
            },
            {
                where: {
                    member_id: req.params.id,
                },
            }
        );
        MemberRespository.findByPk(req.params.id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- DELETE -------------------------------//

async function deleteMember(req, res) {
    try {
        await MemberRespository.destroy({
            where: {
                member_id: req.params.id,
            },
        });
    
        MemberRespository.findAll().then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- EXPORT -----------------------------//

module.exports = {
    findAll,
    addMember,
    updateMember,
    deleteMember
}