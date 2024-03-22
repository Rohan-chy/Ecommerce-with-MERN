const userModel = require("../model/userModel");
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendMail");

//register users
exports.registerUser=async(req,res)=>{
    const {userName,userEmail,userNumber,userPassword}=req.body;
    

    if(!userName || !userEmail || !userNumber || !userPassword){
        return res.status(400).json({
            message:"please enter username,email,phone and password"
        })
    }

    //check already registered or not
    const registeredData=await userModel.find({userEmail:userEmail})
    if(registeredData.length> 0){
        return res.status(400).json({
            message:"user already registered"
        })
    }

    await userModel.create({
        userName,
        userEmail,
        userNumber,
        userPassword:bcrypt.hashSync(userPassword,10)
    })

    res.status(201).json({
        message:"user registered successfully"
    })
}

//login users
exports.loginUser=async(req,res)=>{
    const {userEmail,userPassword}=req.body;
    
    if(!userEmail || !userPassword){
        return res.status(400).json({
            message:'please enter userEmail and userPassword'
        })
    }

    //check registered or not
    const registeredData=await userModel.find({userEmail:userEmail})
    if(registeredData.length== 0){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const isTrue=bcrypt.compareSync(userPassword,registeredData[0].userPassword)
    if(isTrue){

        const token=jwt.sign({id:registeredData[0]._id},process.env.SECRET_KEY,{expiresIn:'10d'}) //first argument is payload i.e kun data lukaune, second parameter secret key to decrypt token and third parameter is expiry time

        res.status(200).json({
            message:"login success",
            token:token
        })
    }
    else{
        res.status(404).json({
            message:"invalid credentials",
            
        })
    }

}

//forgotPassword
exports.forgotPassword=async(req,res)=>{
    const {userEmail}=req.body;

    if(!userEmail){
       return res.status(400).json({
            message:"please enter email"
        })
    }

    const userData=await userModel.find({userEmail:userEmail})
    if(userData.length==0){
        return res.status(404).json({
            message:"user not found"
        })
    }

    const otp=Math.floor(1000 + Math.random()*9000)

    // database maa otp store gareko
     userData[0].otp = otp;
     await userData[0].save()

    //  mail maa otp send gareko
    await sendEmail({
        email:userEmail,
        subject:"Forgot Password",
        message:`The otp for reset password is ${otp}. Do not share with anyone.`
    })

    res.status(200).json({
        message:"otp sent successfully"
    })
}

//verify otp
exports.verifyOtp=async(req,res)=>{
    const {userEmail,otp}=req.body;

    if(!userEmail || !otp){
        return res.status(400).json({
            message:"please enter otp"
        })
    }

    const userData=await userModel.find({userEmail:userEmail})
    if(userData.length ==0){
        return res.status(404).json({
            message:"user not found"
        })
    }
    
    if(userData[0].otp !==otp){
        return  res.status(400).json({
            message:"invalid otp"
        })
    }

    userData[0].otp=undefined;
    userData[0].otpVerified=true;
    await userData[0].save();
    res.status(200).json({
        message:"otp is verified"
    })
   
}

//reset password
exports.resetPassword=async(req,res)=>{
    const {userEmail,newPassword,confirmPassword}=req.body;
    if(!userEmail || !newPassword || !confirmPassword){
        return res.status(400).json({
            message:"please provide email, newPassword and confirmPassword"
        })
    }

    const userData=await userModel.find({userEmail:userEmail})
    if(userData.length ==0){
        return res.status(404).json({
            message:"user not found"
        })
    }

    if(userData[0].otpVerified==false){
        return res.status(403).json({
            message:"otp status is not verified, can not change password "
        })
    }
    
    if(newPassword !== confirmPassword){
        return res.status(400).json({
            message:"password doesnot match"
        })
    }


    userData[0].userPassword=bcrypt.hashSync(newPassword,10)
    userData[0].otpVerified=false;
    await userData[0].save();

    res.status(200).json({
        message:"password reset successfully"
    })
}