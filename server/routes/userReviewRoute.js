const { createReview, getReview, deleteReview } = require('../controller/user/userController')
const isAuthenticated = require('../middleware/isAuthenticated')
const exceptionalHandling = require('../utils/exceptionalHandling')

const router=require('express').Router()

router.route('/reviews/:id')
.post(isAuthenticated,exceptionalHandling(createReview))
.get(exceptionalHandling(getReview))
.delete(exceptionalHandling(deleteReview))


module.exports=router