const { createUser, getOne, login } = require('../controller/adminUser.controller')

const router = require('express').Router()


router.post('/create',createUser);
router.get('/getOne/:id',getOne);


module.exports = router