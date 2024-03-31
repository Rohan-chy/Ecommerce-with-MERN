const userModel = require("../model/userModel")

exports.adminUser=async(req,res)=>{

    const currentUser=req.user[0]._id; //req.user agadiko isAuthenticated middleware bata aaera xa

    
    // sabai user ko data fetch gareko except current user
    // $ne vaneko not equal ho jasle current user bahek aru data didai xa
    // select method le field haruko data add minus garera dine garxa. e.g -otpVerified le otpverified field bahek aru field data dinxa 
    const users=await userModel.find({_id:{$ne : currentUser}}).select(['-otpVerified','-userPassword','-__v']);

    if(users.length > 0){  
          res.status(200).json({
            message:"adminUsers fetched success",
            data:users
        })
    }
    else{
        res.status(404).json({
            message:"no adminUsers found"
        })
    }

    
}