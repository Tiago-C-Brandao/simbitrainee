// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const MemberRespository = require('../Models/memberModel');
const TrainerRespository = require('../Models/trainerModel');

//--------------------------------- GET ----------------------------------//

function findAll(req, res) {
    MemberRespository.findAll().then((result) => res.json(result));
}

//---------------------------------- POST -------------------------------//

async function addMember(req, res) {
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
    ).then((result) => res.json(result));
    TrainerRespository.findByPk(req.params.id)
}

//---------------------------------- PUT ---------------------------------//

async function updateMember(req, res) {
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
    MemberRespository.findByPk(req.params.id).then((result) => res.json(result));
}

//------------------------------------- DELETE -------------------------------//

async function deleteMember(req, res) {
    await MemberRespository.destroy({
        where: {
            member_id: req.params.id,
        },
    });

    MemberRespository.findAll().then((result) => res.json(result));
}

//------------------------------------- EXPORT -----------------------------//

module.exports = {
    findAll,
    addMember,
    updateMember,
    deleteMember
}