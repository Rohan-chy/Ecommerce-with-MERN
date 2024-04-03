const orderModel = require("../../model/orderModel");

exports.createOrder=async(req,res)=>{
    const userId=req.user[0]._id;
    const{items,totalAmount,shippingAddress,paymentDetails}=req.body;

    if(items.length==0){
        return res.status(400).json({
            message:"please provide items"
        })
    }

    if(!totalAmount){
        return res.status(400).json({
            message:"please provide totalAmount"
        })
    }
    if(!paymentDetails){
        return res.status(400).json({
            message:"please provide paymentDetails"
        })
    }
    if(!shippingAddress){
        return res.status(400).json({
            message:"please provide shippingAddress"
        })
    }

    await orderModel.create({
        userId,
        items,
        totalAmount,
        shippingAddress,
        paymentDetails
    })

    res.status(200).json({
        message:"items ordered successfully"
    })
}

//get all my orders
exports.getMyAllOrders=async(req,res)=>{
    const userId=req.user[0]._id;
    const orders=await orderModel.find({userId}).populate({
        path:'items.productId',  //items field ko pni vitra ko product details chahiyeko so items.productId
        model:'Product',
        select:'-productQuantity -createdAt -updatedAt -__v'
    })

    if(orders.length==0){
        return res.status(400).json({
            message:"no orders",
            data:[]
        })
    }

    res.status(200).json({
        message:'order fetched successfully',
        data:orders
    })
}