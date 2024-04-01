const productModel = require("../../model/productModel");
const reviewModel=require('../../model/reviewModel')

//create review
exports.createReview=async(req,res)=>{
    const userId=req.user[0]._id;
    const {rating,message}=req.body;
    const productId=req.params.id;


    if(!productId){
        return res.status(400).json({
            message:"please provide productId"
        })
    }
    if(!rating){
        return res.status(400).json({
            message:"please provide rating"
        })
    }
    if(!message){
        return res.status(400).json({
            message:"please provide message"
        })
    }

    const productExist=await productModel.findById(productId);
    if(!productExist){
        return res.status(400).json({
            message:"no product with that productId"
        })
    }

    await reviewModel.create({
        userId,
        productId,
        rating,
        message
    })
    res.status(200).json({
        message:" review added success"
    })
}

//get review
exports.getReview=async(req,res)=>{

    // review product ko basis maa garne ho so productId leko
    const productId=req.params.id;

    if(!productId){
        return res.status(400).json({
            message:"please provide productId"
        })
    }

    const productExist=await productModel.findById(productId)

    if(!productExist){
        return res.status(400).json({
            message:"no product found with that productId"
        })
    }

    const reviews=await reviewModel.find({productId})  //yaha findById reviewModel ko id use garera garda auta single review dinthiyo sabai ko lagi find use gareko

    if(reviews.length==0){
        return res.status(400).json({
            message:"no review found"
        })
    }
    res.status(200).json({
        message:'review fetched successfully',
        data:reviews
    })
}

//delete review
exports.deleteReview=async(req,res)=>{
    const reviewId=req.params.id;

    if(!reviewId){
        return res.status(400).json({
            message:"please provide reviewId"
        })
    }

    const reviewExist=await reviewModel.findById(reviewId)
    
    if(!reviewExist){
        return res.status(400).json({
            message:"no review found with that reviewId"
        })
    }

    await reviewModel.findByIdAndDelete(reviewId);

    res.status(200).json({
        message:"review delete success"
    })

}