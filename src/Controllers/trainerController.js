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
        const trainer = await TrainerRespository.findByPk(trainer_id);

        if(trainer === null) {
            return res.status(400).json({ message: 'Este treinador não existe' });
        }

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
        res.status(200).json(trainer);
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

        if(trainer === null) {
            return res.status(400).json({ message: 'Este treinador não existe' });
        } else if(member === null) {
            return res.status(400).json({ message: 'Este membro não existe' });
        } 
        
        if(trainer.members !== null) {
            if (trainer.members.find(member => member.id === member_id)) {
                return res.status(400).json({ message: 'Membro já está na lista do treinador' });
            } else if (member.trainer_id !== null && member.trainer_id !== trainer.trainer_id) {
                const oldTrainer = await TrainerRespository.findByPk(member.trainer_id);
                const updatedMemberListOldTrainer = oldTrainer.members.filter((member) => member.id !== member_id);
                await TrainerRespository.update(
                    {
                        members: updatedMemberListOldTrainer,
                    },
                    {
                        where: {
                            trainer_id: oldTrainer.trainer_id,
                        },
                    }
                );
            }
        }
        
        const addMemberList = {id: member.member_id, name: member.member_name, email: member.member_email}

        const updatedMemberList = trainer.members ? [...trainer.members, addMemberList] : [addMemberList];

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
        res.status(200).json(member);
    } catch (err) {
        return res.status(500).send(err);
    }
}

async function removeMemberToTrainer(req, res) {
    const { trainer_id } = req.params
    const { member_id } = req.body

    try {
        const trainer = await TrainerRespository.findByPk(trainer_id)
        const member = await MemberRespository.findByPk(member_id);

        if(trainer === null) {
            return res.status(400).json({ message: 'Este treinador não existe' });
        }else if(member === null) {
            return res.status(400).json({ message: 'Este membro não existe' });
        }

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
                trainer_id: 1,
            },
            {
                where: {
                    member_id,
                },
            }
        );
        res.status(200).json(trainer);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//------------------------------------- DELETE -------------------------------//

async function deleteTrainer(req, res) {
    const { trainer_id } = req.params
    try {
        const trainer = await TrainerRespository.findByPk(trainer_id);

        if(trainer === null) {
            return res.status(400).json({ message: 'Este treinador não existe' });
        }

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
    removeMemberToTrainer,
    deleteTrainer
}