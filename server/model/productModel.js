const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    productName:{
        type:String,
        required:[true,'productName must be provided']
    },
    productDescription:{
        type:String,
        required:[true,'productDescription must be provided']
    },
    productPrice:{
        type:Number,
        required:[true,'productPrice must be provided']
    },
    productQuantity:{
        type:Number,
        required:[true,'productQuantity must be provided']
    },
    productStatus:{
        type:String,
        enum:['available','unavailable']
    }
    
},
{
    timestamps:true
})

module.exports=mongoose.model('Product',productSchema)