const mongoose=require('mongoose');

exports.connectDb=async()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("database connected successfully")
    } catch (error) {
        console.log("database connection error:",error) 
    }
}