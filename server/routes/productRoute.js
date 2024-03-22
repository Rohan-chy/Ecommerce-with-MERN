const { adminProductController } = require('../controller/adminProduct');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');

const router=require('express').Router()

router.route('/product').post(isAuthenticated,restrictRole('admin'),adminProductController);


module.exports=router