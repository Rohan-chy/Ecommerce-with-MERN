const { getMyProfile, deleteMyProfile, updateMyProfile, updateMyPassword } = require('../controller/user/profileController');
const isAuthenticated = require('../middleware/isAuthenticated');
const exceptionalHandling = require('../utils/exceptionalHandling');

const router=require('express').Router();

router.route('/profile').get(isAuthenticated,exceptionalHandling(getMyProfile))
.delete(isAuthenticated,exceptionalHandling(deleteMyProfile))
.patch(isAuthenticated,exceptionalHandling(updateMyProfile))

router.route('/changepassword').patch(isAuthenticated,exceptionalHandling(updateMyPassword))


module.exports=router;