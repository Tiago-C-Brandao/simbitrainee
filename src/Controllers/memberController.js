// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = Sequelize;
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

function findMember(req, res) {
    const { member_name } = req.body;
    try {
      MemberRespository.findAll({
        where: {
          member_name: {
            [Op.like]: `${member_name}%`,
          }
        }
      }).then((result) => res.status(200).json(result));
    } catch (err) {
      return res.status(500).send(err);
    }
  }

//---------------------------------- POST -------------------------------//

async function addMember(req, res) {
    const { trainer_id } = req.params;
    const { member_name, member_email, password } = req.body;
    try {
        await MemberRespository.create(
            {
                member_name, member_email, password, trainer_id
            }, 
            {
                where: {
                    trainer_id,
                }
            }
        ).then((result) => res.status(200).json(result));
        TrainerRespository.findByPk(trainer_id)
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PUT ---------------------------------//

async function updateMember(req, res) {
    const { member_id } = req.params;
    const { member_name, member_email, password } = req.body;
    try {
        await MemberRespository.update(
            {
                member_name, member_email, password
            },
            {
                where: {
                    member_id
                },
            }
        );
        MemberRespository.findByPk(member_id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- DELETE -------------------------------//

async function deleteMember(req, res) {
    const { member_id } = req.params
    try {
        await MemberRespository.destroy({
            where: {
                member_id,
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
    findMember,
    addMember,
    updateMember,
    deleteMember
}