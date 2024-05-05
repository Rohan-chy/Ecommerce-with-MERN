const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModel",
        required:true
    },
    items:[{
        quantity:{type:Number, required:true},
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    shippingAddress:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:Number,
        required:true
    },
    orderStatus:{
        type:String,
        enum:['pending','delivered','cancelled','on the way','preparation'],
        default:"pending"
    },
    paymentDetails:{
        method:{type:String,enum:['COD','Khalti']},
        paymentStatus:{type:String,enum:['paid','unpaid','pending'],default:"pending"}
    }
},{
    timestamps:true
})

module.exports=mongoose.model('OderModel',orderSchema)