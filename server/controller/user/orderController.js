const orderModel = require("../../model/orderModel");
const userModel = require("../../model/userModel");

exports.createOrder=async(req,res)=>{
    const userId=req.user[0]._id;
    const{items,totalAmount,shippingAddress,paymentDetails,phoneNumber}=req.body;

    if(!items.length > 0){
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
    if(!phoneNumber){
        return res.status(400).json({
            message:"please provide phoneNumber"
        })
    }

    const orderData=await orderModel.create({
        userId,
        items,
        totalAmount,
        shippingAddress,
        paymentDetails,
        phoneNumber
    })


    const userData=await userModel.findById(userId)
    userData.cart=[]
    await userData.save()

    res.status(200).json({
        message:"items ordered successfully",
        data:orderData
    })
}

//get all my orders
exports.getMyAllOrders=async(req,res)=>{
    const userId=req.user[0]._id;
    const orders=await orderModel.find({userId}).populate({
        path:'items.product',  //items field ko pni vitra ko product details chahiyeko so items.productId
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


//update orders
exports.updateOrder=async(req,res)=>{
    const userId=req.user[0]._id;
    const orderId=req.params.id;
    const {items,shippingAddress}=req.body

    if(!orderId){
        return res.status(400).json({
            message:"please provide order id"
        })
    }

    const orders=await orderModel.findById(orderId);

    if(!orders){
        return res.status(400).json({
            message:"no order found"
        })
    }

    // check jasle order gareko usko id xa ki nai order schema maa
    if(orders.userId != userId){
        return res.status(400).json({
            message:"you do not have permission"
        })
    }

    // check order status
    if(orders.orderStatus=='on the way'){
        return res.status(400).json({
            message:"can not update, order is on the way"
        })
    }

    const updatedOrder=await orderModel.findByIdAndUpdate(orderId,{
        items,
        shippingAddress
    },{new:true})

    res.status(200).json({
        message:"order updated",
        data:updatedOrder
    })
}

exports.deleteOrder=async(req,res)=>{
    const userId=req.user[0]._id;
    const orderId=req.params.id;

    if(!orderId){
        return res.status(400).json({
            message:"please provide orderId"
        })
    }

    const orders=await orderModel.findById(orderId)

    if(!orders){
        return res.status(400).json({
            message:"no orders found"
        })
    }

    if(orders.userId != userId){
        return res.status(400).json({
            message:"do not have permission"
        })
    }

    await orderModel.findByIdAndDelete(orderId)

    res.status(200).json({
        message:"order delete success"
    })
}

// cancel order
exports.cancelOrder=async(req,res)=>{
    const userId=req.user[0]._id;
    const orderId=req.params.id;

    
    if(!orderId){
        return res.status(400).json({
            message:"please provide order id"
        })
    }

    const orders=await orderModel.findById(orderId);

    if(!orders){
        return res.status(400).json({
            message:"no order found"
        })
    }

    // check jasle order gareko usko id xa ki nai order schema maa
    if(orders.userId != userId){
        return res.status(400).json({
            message:"you do not have permission"
        })
    }

    // check order status
    if(orders.orderStatus !='pending'){
        return res.status(400).json({
            message:"can not update, order is processed"
        })
    }

    const updatedOrder=await orderModel.findByIdAndUpdate(orderId,{
        orderStatus:'cancelled'
    },{
        new:true
    })

    res.status(200).json({
        message:"order cancelled successfully",
        data:updatedOrder
    })
}