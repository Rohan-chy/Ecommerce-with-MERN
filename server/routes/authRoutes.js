const { registerUser, loginUser, forgotPassword, verifyOtp, resetPassword } = require('../controller/authController');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router()

router.route('/register').post(exceptionalHandling(registerUser));
router.route('/login').post(exceptionalHandling(loginUser));
router.route('/forgotPassword').post(exceptionalHandling(forgotPassword))
router.route('/verifyOtp').post(exceptionalHandling(verifyOtp))
router.route('/resetPassword').post(exceptionalHandling(resetPassword))



module.exports=router