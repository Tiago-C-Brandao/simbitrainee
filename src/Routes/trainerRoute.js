const { Router } = require('express');
const trainers = require('../Controllers/trainerController');
const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/trainers', trainers.findAll);

router.post('/addTrainer', trainers.addTrainer)

module.exports = router;