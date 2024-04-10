const productModel = require("../model/productModel");
const fs=require('fs')

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


//delete product
exports.deleteProduct=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({
            message:"please provide id"
        })
    }

    const oldData=await productModel.findById(id);
    const oldImage=oldData.productImage;
    const server_url_length=process.env.SERVER_URL.length;

     if(!oldImage){
	return res.status(400).json({
		message:"no previous image"
	})
}

    const filter_oldImage=oldImage?.slice(server_url_length);
	
  

    // deleting images from uploads folder
    fs.unlink(`./uploads/${filter_oldImage}`,(error)=>{
    if(error){
        console.log('image file error:',error);
    }
    else{
        console.log("image file deleted")
    }
    }
    )


    await productModel.findByIdAndDelete(id)
    res.status(200).json({
        message:'product deleted'
    })
}


//update product
exports.updateProduct=async(req,res)=>{
    const {id}=req.params;
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

     //id
    if(!id){
        return res.status(400).json({
            message:"please provide id"
        })
    }

    const oldData=await productModel.findById(id);

     //oldData
    if(!oldData){
        return res.status(400).json({
            message:"no data found"
        })
    }

    const oldImage=oldData.productImage;
    const server_url_length=process.env.SERVER_URL.length;

    const filter_oldImage=oldImage.slice(server_url_length);

    if(req.file && req.file.filename){
        fs.unlink(`./uploads/${filter_oldImage}`,(err)=>{
            if(err){
                console.log("image update error:",err)
            }
            else{
                console.log("image file updated")
            }
        })
    }

    const data=await productModel.findByIdAndUpdate(id,{
        productName,
        productDescription,
        productPrice,
        productQuantity,
        productStatus,
        productImage: req.file && req.file.filename ? `${process.env.SERVER_URL}/${req.file.filename}`:oldImage
    },{
        new:true
    })

    res.status(200).json({
        message:"product updated",
        data:data
    })
    
}