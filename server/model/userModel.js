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
    },
    otp:{
        type:Number
    },
    otpVerified:{
        type:Boolean,
        default:false
    },
    cart:[{
        quantity:{
            type:Number,
            required:true
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    }]
},
{
    timestamps:true
})

module.exports=mongoose.model('UserModel',userSchema);