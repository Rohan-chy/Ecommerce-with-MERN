const orderModel = require("../../model/orderModel");

//get all my orders
exports.getAllOrders=async(req,res)=>{
    const userId=req.user[0]._id;
    const orders=await orderModel.find().populate({
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