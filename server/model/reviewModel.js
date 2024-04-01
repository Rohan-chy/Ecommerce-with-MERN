const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:[true,"review must be provided with userId"]
    },
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product",
        required:[true,'review must be of product']
    },
    rating:{
        type: Number,
        required:true,
        default:3
    },
    message:{
        type: String,
        required: true
    }
},{
    timestamps:true
})

module.exports=mongoose.model('ReviewModel',reviewSchema)