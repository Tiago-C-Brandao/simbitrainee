const { Router } = require('express');
const trainers = require('../Controllers/trainerController');

const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/trainers', trainers.findAll);
router.get('/trainers/:id', trainers.findTrainer);

router.post('/trainers', trainers.addTrainer);

router.patch('/trainers/:id', trainers.updateTrainer);

router.delete('/trainers/:id', trainers.deleteTrainer);

module.exports = router;