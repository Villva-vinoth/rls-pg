const router = require('express').Router()
const adminUserRouter = require('../router/adminUser.router')
const authRouter = require('../router/auth.router');
const {setTenantId} = require('./setTenantId');

router.use('/users',setTenantId,adminUserRouter);
router.use('/auth',authRouter);


module.exports = router