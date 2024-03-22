const promisify=require('util').promisify;
const jwt=require('jsonwebtoken');
const userModel = require('../model/userModel');


const isAuthenticated=async(req,res,next)=>{

    // const token=req.headers.authorization;

    //check login status
    // if(!token){
    //     return res.status(401).json({
    //         message:"please login"
    //     })
    // }

    // const decrypt=await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    // console.log(decrypt);

    //accessing token from headers
    const token=req.headers.authorization;

    if(!token){
        return res.status(403).json({
            message:"please login"
        })
    }

    //decrypt user
    const decrypt=await promisify(jwt.verify)(token,process.env.SECRET_KEY)
    // console.log(decrypt);

    // accessing users data to check whether user registered or not
    const userData=await userModel.find({_id:decrypt.id})

    if(userData.length==0){
       return res.status(404).json({
            message:'user not found'
        })
    }

    //sending user data to productController in variable req.user
    req.user=userData;
    next();

}

module.exports=isAuthenticated