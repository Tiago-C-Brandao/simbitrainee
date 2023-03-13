const { Router } = require('express');
const trainers = require('../Controllers/trainerController');
const members = require('../Controllers/memberController');

const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/trainers', trainers.findAll);
router.get('/trainers/:trainer_id', trainers.findTrainer);


router.post('/trainers', trainers.addTrainer);

router.patch('/trainers/:trainer_id', trainers.updateTrainer);

router.delete('/trainers/:trainer_id', trainers.deleteTrainer);

module.exports = router;