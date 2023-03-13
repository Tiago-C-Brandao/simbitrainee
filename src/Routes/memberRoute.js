const { Router } = require('express');
const members = require('../Controllers/memberController');
const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/members/find_all', members.findAll);

router.post('/trainers/:trainer_id/members/creater', members.addMember);

router.patch('/members/update/:member_id', members.updateMember);

router.delete('/members/delete/:member_id', members.deleteMember);

module.exports = router;