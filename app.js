const express=require('express')
const { connectDb } = require('./database/database')
const userModel = require('./model/userModel')
const bcrypt=require('bcryptjs')
const jwt = require('jsonwebtoken');
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//requiring dotenv
require('dotenv').config()

//database connection
connectDb();

//register users
app.post('/register',async(req,res)=>{
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
})


//login users
app.post('/login',async(req,res)=>{
    const {userEmail,userPassword}=req.body;
    // console.log(req.body)
    
    if(!userEmail || !userPassword){
        return res.status(400).json({
            message:'please enter userEmail and userPassword'
        })
    }

    //check registered or not
    const registeredData=await userModel.find({userEmail:userEmail})
    // console.log(registeredData)
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

})


app.listen(process.env.PORT,()=>{
    console.log(`server startd at port ${process.env.PORT}`)
})