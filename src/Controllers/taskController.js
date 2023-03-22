const Sequelize = require("sequelize");
const TaskRepository = require("../Models/taskModel");
const MemberRespository = require("../Models/memberModel");
const TrainerRespository = require("../Models/trainerModel");

//--------------------------------- GET ----------------------------------//

function findAll(req, res) {
    try{
        TaskRepository.findAll().then((result) => res.status(200).json(result));
    } catch (err){
        return res.status(500).send(err);
    }
}

async function findTask(req, res) {
    const { task_id } = req.params
    try {
        const task = await TaskRepository.findByPk(task_id);
        if(task === null) {
            return res.status(400).json({ message: 'Esta task não existe' });
        }
        res.status(200).json(task);
    } catch (err) {
        return res.status(500).send(err);
    }
}

//--------------------------------- POST ----------------------------------//

async function addTask(req, res) {
    const { trainer_id, member_id } = req.params;
    const { task_title, task_description, date_delivery } = req.body;
    
    try {
        const trainer = await TrainerRespository.findByPk(trainer_id);
        const member = await MemberRespository.findByPk(member_id);

        if(trainer === null) {
            return res.status(400).json({ message: 'Este treinador não existe' });
        } else if (member === null) {
            return res.status(400).json({ message: 'Este membro não existe' });
        }

        await TaskRepository.create({
            task_title, task_description, date_delivery, member_id: member_id,
        }).then((result) => res.status(200).json(result));
    } catch(err) {
        return res.status(500).sen(err);
    }
}

//---------------------------------- PATCH ---------------------------------//

async function updateTask(req, res) {
    const { trainer_id, member_id, task_id } = req.params;
    const { task_title, task_description, date_delivery, status } = req.body;

    try{

        const trainer = await TrainerRespository.findByPk(trainer_id);
        const member = await MemberRespository.findByPk(member_id);
        const tasks = await TaskRepository.findByPk(task_id);
        
        if(trainer === null) {
            return res.status(400).json({ message: 'Este trainador não existe' });
        } else if(member === null) {
            return res.status(400).json({ message: 'Este membro não existe' });
        }else if(tasks === null) {
            return res.status(400).json({ message: 'Esta task não existe' });
        }
        
        if(status !== "Entregue") {
            dateSend = null
        } else {
            dateSend = new Date()
        }
        await TaskRepository.update(
            {
                task_title, task_description, date_delivery, status, date_send: dateSend
            }, 
            {
                where: {
                    task_id
                }
            }
        );
        return res.status(200).json(tasks);
    } catch(err) {
        return res.status(500).send(err);
    }
}

//---------------------------------- PATCH ---------------------------------//

async function deleteTask(req, res) {
    const { trainer_id, member_id, task_id } = req.params;
    try {
        const trainer = await TrainerRespository.findByPk(trainer_id);
        const member = await MemberRespository.findByPk(member_id);
        const tasks = await TaskRepository.findByPk(task_id);
        
        if(trainer === null) {
            return res.status(400).json({ message: 'Este trainador não existe' });
        } else if(member === null) {
            return res.status(400).json({ message: 'Este membro não existe' });
        }else if(tasks === null) {
            return res.status(400).json({ message: 'Esta task não existe' });
        }

        await TaskRepository.destroy({
            where: {
                task_id
            }
        });
        
        TaskRepository.findAll().then((result) => res.status(200).json(result));
    } catch(err) {
        res.status(500).send(err);
    }
}

//--------------------------------- EXPORT ---------------------------------//

module.exports = {
    findAll,
    findTask,
    addTask,
    updateTask,
    deleteTask,
}