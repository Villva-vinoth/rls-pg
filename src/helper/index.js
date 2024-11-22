const router = require('express').Router()
const adminUserRouter = require('../api/router/adminUser.router')
const authRouter = require('../api/router/auth.router');
const {setTenantId} = require('./setTenantId');

router.use('/users',setTenantId,adminUserRouter);
router.use('/auth',authRouter);


module.exports = router