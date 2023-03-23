const { Router } = require('express');
const tasks = require('../Controllers/taskController');
const members = require('../Controllers/memberController');
const trainer = require('../Controllers/trainerController');

const router = Router();

router.get('/tasks/find_all', tasks.findAllTasks);
router.get('/tasks/find_task/:task_id', tasks.findTask);
router.get('/trainers/:trainer_id/members/:member_id/tasks', tasks.findMemberTask);

router.post('/trainers/:trainer_id/members/:member_id/tasks/creater', tasks.addTask);

router.patch('/trainers/:trainer_id/members/:member_id/tasks/update/:task_id', tasks.updateTask);

router.delete('/trainers/:trainer_id/members/:member_id/tasks/delete/:task_id', tasks.deleteTask);

module.exports = router;