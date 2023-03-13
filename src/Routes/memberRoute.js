const { Router } = require('express');
const members = require('../Controllers/memberController');
const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/members', members.findAll);

router.post('/trainers/:trainer_id/members', members.addMember);

router.patch('/members/:member_id', members.updateMember);

router.delete('/members/:member_id', members.deleteMember);

module.exports = router;