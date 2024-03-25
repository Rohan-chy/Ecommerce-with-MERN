const { adminProductController, getProducts, singleProduct } = require('../controller/adminProduct');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');
const {multer,storage}=require('../middleware/multer');
const exceptionalHandling = require('../utils/exceptionalHandling');
const upload=multer({storage:storage})

const router=require('express').Router()

router.route('/product')
.post(isAuthenticated,restrictRole('admin'),upload.single('avatar'),exceptionalHandling(adminProductController))
.get(exceptionalHandling(getProducts));

router.route('/product/:id').get(exceptionalHandling(singleProduct));


module.exports=router