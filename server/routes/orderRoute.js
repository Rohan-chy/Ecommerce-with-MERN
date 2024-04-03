const { getAllOrders } = require('../controller/admin/orderController')
const { createOrder, getMyAllOrders } = require('../controller/user/orderController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictRole = require('../middleware/restrictRole')
const exceptionalHandling = require('../utils/exceptionalHandling')

const router=require('express').Router()

router.route('/orders')
.post(isAuthenticated,exceptionalHandling(createOrder))
.get(isAuthenticated,exceptionalHandling(getMyAllOrders))

router.route('/admin/orders').get(isAuthenticated,restrictRole('admin'),exceptionalHandling(getAllOrders))

module.exports=router