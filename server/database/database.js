const mongoose=require('mongoose');
const userModel = require('../model/userModel');
const bcrypt=require('bcryptjs');

exports.connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connected successfully")

        // seeding admin
        const adminExist=await userModel.find({userEmail:"admin@gmail.com"})

        if(adminExist.length > 0){
            console.log("admin created already")
        }
        else{
            await userModel.create({
                userName:"admin",
                userEmail:"admin@gmail.com",
                userNumber:"9812345678",
                userPassword:bcrypt.hashSync('admin',10),
                role:"admin"
            })
        }

        console.log("admin seeded")

    } catch (error) {
        console.log("database connection error:",error) 
    }
}