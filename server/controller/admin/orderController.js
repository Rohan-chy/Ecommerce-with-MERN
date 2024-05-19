const orderModel = require("../../model/orderModel");
const Product = require("../../model/productModel");

//get all my orders
exports.getAllOrders=async(req,res)=>{
    const userId=req.user[0]._id;
    const orders=await orderModel.find().populate({
        path:'items.product',  //items field ko pni vitra ko product details chahiyeko so items.productId
        model:'Product',
        select:' -createdAt -updatedAt -__v'
    }).populate('userId')

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

//get single order
exports.getSingleOrder=async(req,res)=>{
    const orderId=req.params.id;
    if(!orderId){
        return res.status(400).json({
            message:'please provide order id'
        })
    }

    const singleOrder=await orderModel.findById(orderId);

    if(!singleOrder){
        return res.status(400).json({
            message:'no order found with that id'
        })
    }

    res.status(200).json({
        message:"data fetched successfully",
        data:singleOrder
    })
}

// update order status
exports.updateOrderStatus=async(req,res)=>{
    const {orderId}=req.params;
    const {orderStatus}=req.body;

    const status=['pending','delivered','cancelled','on the way','preparation']

    if(!orderId){
        return res.status(400).json({
            message:'please provide order id'
        })
    }

    if(!orderStatus){
        return res.status(400).json({
            message:"please provide order status"
        })
    }

    if(!status.includes(orderStatus.toLowerCase())){
        return res.status(400).json({
            message:"please provide valid status"
        })
    }

    const order=await orderModel.findById(orderId);
    if(!order){
        return res.status(404).json({
            message:"no data found with that id"
        })
    }

    const updatedOrder=await orderModel.findByIdAndUpdate(orderId,{
        orderStatus:orderStatus
    },{
        new:true
    }).populate({
        path:"items.product",
        model : "Product"
    })

    // order ko status delivered huda inventory bata stock quantity reduce garne
    let necessaryData
    if(orderStatus === "delivered"){
        // items maa products xa so items bata chahine info leko reduce garna lai
         necessaryData = updatedOrder.items.map((item)=>{
            return {
                quantity : item.quantity,
                productId : item.product._id,
                productQuantity : item.product.productQuantity
            }
        })

        for(var i = 0 ; i < necessaryData.length; i ++){
            await Product.findByIdAndUpdate(necessaryData[i].productId,{
                productQuantity : necessaryData[i].productQuantity - necessaryData[i].quantity
            })
        }


    }

    res.status(200).json({
        message:"order status updated successfully",
        data:updatedOrder
    })
}
// update payment status
exports.updatePaymentStatus=async(req,res)=>{
    const {orderId}=req.params;
    const {paymentStatus}=req.body;

    const status=['pending','paid','unpaid']

    if(!orderId){
        return res.status(400).json({
            message:'please provide order id'
        })
    }

    if(!paymentStatus){
        return res.status(400).json({
            message:"please provide payment status"
        })
    }

    if(!status.includes(paymentStatus.toLowerCase())){
        return res.status(400).json({
            message:"please provide valid status"
        })
    }

    const order=await orderModel.findById(orderId);
    if(!order){
        return res.status(404).json({
            message:"no data found with that id"
        })
    }

    const updatedStatus=await orderModel.findByIdAndUpdate(orderId,{
        'paymentDetails.paymentStatus':paymentStatus
    },{
        new:true
    })

    res.status(200).json({
        message:"payment status updated successfully",
        data:updatedStatus
    })
}

//delete order
exports.deleteOrderAdmin=async(req,res)=>{
    const {orderId}=req.params;

     if(!orderId){
        return res.status(400).json({
            message:'please provide order id'
        })
    }

     const order=await orderModel.findById(orderId);
    if(!order){
        return res.status(404).json({
            message:"no data found with that id"
        })
    }

    await orderModel.findByIdAndDelete(orderId);

    res.status(200).json({
        message:"order deleted successfully",
        data:null
    })
}