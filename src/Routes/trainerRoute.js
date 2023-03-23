const { Router } = require('express');
const trainers = require('../Controllers/trainerController');
const members = require('../Controllers/memberController');

const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/trainers/find_all', trainers.findAll);
router.get('/trainers/find_trainer/:trainer_id', trainers.findTrainer);


router.post('/trainers/creater', trainers.addTrainer);

router.patch('/trainers/update/:trainer_id', trainers.updateTrainer);
router.patch('/trainers/select_member/:trainer_id', trainers.addMemberToTrainer);
router.patch('/trainers/remove_member/:trainer_id', trainers.removeMemberToTrainer);

router.delete('/trainers/delete/:trainer_id', trainers.deleteTrainer);

module.exports = router;