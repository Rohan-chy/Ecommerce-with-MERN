const { addToCart, getMyAllCart, deleteItemFromCart, updateItemFromCart } = require('../controller/user/cartController');
const isAuthenticated = require('../middleware/isAuthenticated');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router()

router.route('/cart').get(isAuthenticated,exceptionalHandling(getMyAllCart))

router.route('/cart/:id')
.post(isAuthenticated,exceptionalHandling(addToCart))
.delete(isAuthenticated,exceptionalHandling(deleteItemFromCart))
.patch(isAuthenticated,exceptionalHandling(updateItemFromCart))


module.exports=router;