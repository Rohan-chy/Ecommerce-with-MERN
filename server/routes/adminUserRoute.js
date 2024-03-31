const { adminUser, deleteUser } = require('../controller/adminUserController');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router();

router.route('/users').get(isAuthenticated,restrictRole('admin'),exceptionalHandling(adminUser))

router.route('/users/:id').delete(isAuthenticated,restrictRole('admin'),exceptionalHandling(deleteUser))

module.exports=router;