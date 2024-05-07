const { inititateKhaltiPayment, verifyPIDX } = require('../controller/user/paymentController')
const isAuthenticated = require('../middleware/isAuthenticated')
const exceptionalHandling = require('../utils/exceptionalHandling')

const router=require('express').Router()

router.route('/payment').post(isAuthenticated,exceptionalHandling(inititateKhaltiPayment))
router.route("/payment/success").get( exceptionalHandling(verifyPIDX))

module.exports=router