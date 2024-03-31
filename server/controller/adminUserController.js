const userModel = require("../model/userModel")

exports.adminUser=async(req,res)=>{
    const users=await userModel.find();
    console.log(users.length)

    if(users.length > 1){
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