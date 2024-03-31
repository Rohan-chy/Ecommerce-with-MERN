const { adminUser } = require('../controller/adminUserController');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router();

router.route('/users').get(isAuthenticated,restrictRole('admin'),exceptionalHandling(adminUser))

module.exports=router;