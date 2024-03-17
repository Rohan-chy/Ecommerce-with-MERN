const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"username must be provided"]
    },
    userEmail:{
        type:String,
        required:[true,"userEmail must be provided"]  
    },
    userNumber:{
        type:String,
        required:[true,"userNumber must be provided"]  
    },
    userPassword:{
        type:String,
        required:[true,"userPassword must be provided"]  
    },
    role:{
        type:String,
        enum:['customer','admin'],
        default:"customer"
    }
})

module.exports=mongoose.model('UserModel',userSchema);