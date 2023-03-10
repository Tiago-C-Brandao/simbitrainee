const { Router } = require('express');
const members = require('../Controllers/memberController');
const { verifyJWT } = require('../Services/VerifyJWT');
const router = Router();

router.get('/members', members.findAll);

router.post('/members', members.addMember);

router.patch('/members/:id', members.updateMember);

router.delete('/members/:id', members.deleteMember);

module.exports = router;