const {default:axios}=require('axios');
const orderModel = require('../../model/orderModel');
const userModel = require('../../model/userModel');

exports.inititateKhaltiPayment=async(req,res)=>{
    const {amount,orderId}=req.body;
    if(!amount||!orderId){
        return res.status(400).json({
            message:"please provide amount and orderID"
        })
    }

    const orderData=await orderModel.findById(orderId);
    if(!orderData){
        return res.status(400).json({
            message:"no order found with that id"
        })
    }

    if(orderData.totalAmount !==amount){
        return res.status(400).json({
            message:"amount must be equal to total amount"
        })
    }

    const data={
        return_url:`${process.env.CLIENT_URL}/payment/success`,
        website_url:process.env.SERVER_URL,
        amount:amount*100,
        purchase_order_id:orderId,
        purchase_order_name:`ORDER_NAME ${orderId}`
    }

    const response=await axios.post('https://a.khalti.com/api/v2/epayment/initiate/',data,{
        headers:{
            'Authorization': 'key 2a30ca72d2f54a439c6d5dbcdd5297d4'
        }
    })

    let orderDetails=await orderModel.findById(orderId);
    orderDetails.paymentDetails.pidx=response.data.pidx;
    await orderDetails.save();

    console.log(response)
    res.status(200).json({
        message:"payment successful",
        paymentUrl:response.data.payment_url
    })
}

exports.verifyPIDX=async(req,res)=>{
    const pidx=req.body.pidx;
    const userId = req.user[0]._id;

    const response=await axios.post('https://a.khalti.com/api/v2/epayment/lookup/',{pidx},{
        headers:{
            'Authorization': 'key 2a30ca72d2f54a439c6d5dbcdd5297d4'
        }
    })

    if(response.data.status==='Completed'){
        //database modification
        let order=await orderModel.find({'paymentDetails.pidx':pidx})

        order[0].paymentDetails.method='Khalti'
        order[0].paymentDetails.paymentStatus='paid';
        await order[0].save();

        const userData=await userModel.findById(userId);
        userData.cart=[];
        await userData.save();

        res.status(200).json({
            message:"payment verification success"
        })

        // notify to frontend
        // res.redirect(process.env.SERVER_URL)
    }
    else{
        res.redirect(`${process.env.SERVER_URL}/error`)
    }
}