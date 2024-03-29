const { adminProductController, getProducts, singleProduct, deleteProduct, updateProduct } = require('../controller/adminProduct');
const isAuthenticated = require('../middleware/isAuthenticated');
const restrictRole = require('../middleware/restrictRole');
const {multer,storage}=require('../middleware/multer');
const exceptionalHandling = require('../utils/exceptionalHandling');
const upload=multer({storage:storage})

const router=require('express').Router()

// avatar vaneko frontend bata pathako fieldname
router.route('/product')
.post(isAuthenticated,restrictRole('admin'),upload.single('avatar'),exceptionalHandling(adminProductController))
.get(exceptionalHandling(getProducts));

router.route('/product/:id')
.get(exceptionalHandling(singleProduct))
.delete(isAuthenticated,restrictRole('admin'),exceptionalHandling(deleteProduct))
.patch(isAuthenticated,restrictRole('admin'),upload.single('avatar'),exceptionalHandling(updateProduct))


module.exports=router