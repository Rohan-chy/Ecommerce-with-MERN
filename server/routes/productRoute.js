const { adminProductController } = require('../controller/adminProduct');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');
const {multer,storage}=require('../middleware/multer')
const upload=multer({storage:storage})

const router=require('express').Router()

router.route('/product').post(isAuthenticated,restrictRole('admin'),upload.single('avatar'),adminProductController);


module.exports=router