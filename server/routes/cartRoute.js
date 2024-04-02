const { addToCart, getMyAllCart, deleteItemFromCart } = require('../controller/user/cartController');
const isAuthenticated = require('../middleware/isAuthenticated');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router()

router.route('/cart/:id').post(isAuthenticated,exceptionalHandling(addToCart)).delete(isAuthenticated,exceptionalHandling(deleteItemFromCart))

router.route('/cart').get(isAuthenticated,exceptionalHandling(getMyAllCart))

module.exports=router;