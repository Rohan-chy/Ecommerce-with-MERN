const { getAllOrders, getSingleOrder, updateOrderStatus, deleteOrderAdmin } = require('../controller/admin/orderController')
const { createOrder, getMyAllOrders, updateOrder, deleteOrder, cancelOrder } = require('../controller/user/orderController')
const isAuthenticated = require('../middleware/isAuthenticated')
const restrictRole = require('../middleware/restrictRole')
const exceptionalHandling = require('../utils/exceptionalHandling')

const router=require('express').Router()

// for users
router.route('/orders')
.post(isAuthenticated,exceptionalHandling(createOrder))
.get(isAuthenticated,exceptionalHandling(getMyAllOrders))

router.route('/orders/cancel').patch(isAuthenticated,exceptionalHandling(cancelOrder))

router.route('/orders/:id')
.patch(isAuthenticated,exceptionalHandling(updateOrder))
.delete(isAuthenticated,exceptionalHandling(deleteOrder))

// for admin
router.route('/admin/orders').get(isAuthenticated,restrictRole('admin'),exceptionalHandling(getAllOrders))
router.route('/admin/orders/:id')
.get(isAuthenticated,restrictRole('admin'),exceptionalHandling(getSingleOrder))
.patch(isAuthenticated,restrictRole('admin'),exceptionalHandling(updateOrderStatus))
.delete(isAuthenticated,restrictRole('admin'),exceptionalHandling(deleteOrderAdmin))

module.exports=router