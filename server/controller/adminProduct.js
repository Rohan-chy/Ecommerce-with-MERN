const productModel = require("../model/productModel");

exports.adminProductController=async(req,res)=>{

    const file=req.file;
    let filePath;
    if(!file){
       filePath='' 
    }
    else{
        filePath=file.filename
    }
    
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
        productStatus,
        productImage:`http://localhost:${process.env.PORT}/${filePath}`
    })

    res.status(200).json({
        message:"product created success"
    })
}

// get all products
exports.getProducts=async(req,res)=>{
    const products=await productModel.find();
    if(products.length==0){
        return res.status(404).json({
            message:'no product found'
        })
    }

    res.status(200).json({
        message:"product fetched success",
        products:products
    })
}

// get single product
exports.singleProduct=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({
            message:"please provide id"
        })
    }

    const singleProduct=await productModel.find({_id:id});
    if(singleProduct.length==0){
        return res.status(400).json({
            message:'no product'
        })
    }

    res.status(200).json({
        message:'product fetched success',
        product:singleProduct
    })
}