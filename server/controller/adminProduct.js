const productModel = require("../model/productModel");

exports.adminProductController=async(req,res)=>{
    const {productName,productDescription,productPrice,productQuantity,productStatus}=req.body;

    //productname
    if(!productName){
        return res.status(400).json({
            message:"please provide productName"
        })
    }

    //productDescription
    if(!productDescription){
        return res.status(400).json({
            message:"please provide productDescription"
        })
    }

    //productPrice
    if(!productPrice){
        return res.status(400).json({
            message:"please provide productPrice"
        })
    }

    //productQuantity
    if(!productQuantity){
        return res.status(400).json({
            message:"please provide productQuantity"
        })
    }

    //productStatus
    if(!productStatus){
        return res.status(400).json({
            message:"please provide productStatus"
        })
    }

    await productModel.create({
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productStatus
    })

    res.status(200).json({
        message:"product created success"
    })
}