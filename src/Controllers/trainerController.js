// const pool = require('../Database/DBconnection');
// const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const TrainerRespository = require('../Models/trainerModel');
const MemberRespository = require('../Models/memberModel');

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
            trainer_name, trainer_email, password,
        }).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PATCH ---------------------------------//

async function updateTrainer(req, res) {
    const { trainer_id } = req.params
    const { trainer_name, trainer_email, password } = req.body

    try {
        await TrainerRespository.update(
            {
                trainer_name, trainer_email, password,
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

async function addMemberToTrainer(req, res) {
    const { trainer_id } = req.params
    const { member_id } = req.body

    try {
        const trainer = await TrainerRespository.findByPk(trainer_id);
        const member = await MemberRespository.findByPk(member_id);

        if(trainer.members !== null) {
            if (trainer.members.find(member => member.id === member_id)) {
                return res.status(400).json({ message: 'Membro já está na lista do treinador' });
            }
            if (member.trainer_id !== null && member.trainer_id !== trainer_id) {
        
                const oldTrainer = await TrainerRespository.findByPk(member.trainer_id);
                
                return res.status(400).json({ message: `O membro que você está tentando adicionar já está na lista de membros do ${oldTrainer.trainer_name}.`});
            }
        }

        const updatedMemberList = trainer.members ? [...trainer.members, {id: member.member_id, name: member.member_name, email: member.member_email}] : [{id: member.member_id, name: member.member_name, email: member.member_email}];

        await TrainerRespository.update(
            {
                members: updatedMemberList,
            },
            {
                where: {
                    trainer_id,
                },
            }
        );

        await MemberRespository.update(
            {
                trainer_id: `${trainer_id}`,
            },
            {
                where: {
                    member_id,
                },
            }
        );
        MemberRespository.findByPk(member_id).then((result) => res.status(200).json(result));
    } catch (err) {
        return res.status(500).send(err);
    }
}

async function removeMember(req, res) {
    const { trainer_id } = req.params
    const { member_id } = req.body

    try {
        const trainer = await TrainerRespository.findByPk(trainer_id)

        const updatedMemberList = trainer.members.filter(member => member.id !== member_id);

        if (updatedMemberList.length === trainer.members.length) {
            return res.status(404).send("Membro não encontrado na lista de membros do treinador");
        }


        await TrainerRespository.update(
            {
                members: updatedMemberList,
            },
            {
                where: {
                    trainer_id,
                },
            }
        );

        await MemberRespository.update(
            {
                trainer_id: `${trainer_id}`,
            },
            {
                where: {
                    member_id,
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
    addMemberToTrainer,
    removeMember,
    deleteTrainer
}