const productModel = require("../../model/productModel");
const userModel = require("../../model/userModel");

//add to cart
exports.addToCart=async(req,res)=>{
    const productId=req.params.id;
    const userId=req.user[0]._id;

    if(!productId){
        return res.status(400).json({
            message:"please provide productId"
        })
    }

    const product=await productModel.findById(productId);
    if(!product){
        return res.status(400).json({
            message:"no product with that productId"
        })
    }

    // user maa xa cart so user fetch gareko ani tesko cart maa productId push garne ho
    const user=await userModel.findById(userId);

    // add gareko item cart maa already exist xa ki nai check gareko
    const existCartItem=user.cart.find((item)=>item.product.equals(productId));

    // cart item already exist xa vne quantity matrai increase garne . xaina vne item add garne by default quantity 1 hunxa
    if(existCartItem){
        existCartItem.quantity +=1
    }
    else{
        user.cart.push({
            quantity:1,
            product:productId
        })
    }

    await user.save()

    // user model bata updated data leko ra user model maaa vako cart ko data pathako
    const updatedUser=await userModel.findById(userId).populate('cart.product')
    res.status(200).json({
        message:"product added to cart",
        data:updatedUser.cart
    })

}

//get items from cart
exports.getMyAllCart=async(req,res)=>{
    const userId=req.user[0]._id;
    // userModel.findById(userId) yesle user maa vako sabai data dinx hamilai cart ko data matrai chahiyeko x cart vitra foreign key xa so populate use gareko so we can get data of foreign key
    const user=await userModel.findById(userId).populate({
        path:"cart.product",
        select:['-productStatus','-__v']
    })
    
    res.status(200).json({
        message:"fetched all carts",
        data:user.cart  //cart ko matrai data pathako
    })
}


//delete items from cart
// delete garna lai kun product delete garne tesko id and kasle delete garne tesko id chahinxa
exports.deleteItemFromCart=async(req,res)=>{
    const userId=req.user[0]._id;
    const productId=req.params.id;

    if(!productId){
        return res.status(400).json({
            message:"please provide product id"
        })
    }

    const product=await productModel.findById(productId);
    if(!product){
        return res.status(400).json({
            message:"no product with that id"
        })
    }

    // user maa xa cart so user fetch gareko
    const user=await userModel.findById(userId)

    user.cart=user.cart.filter((pId)=>pId != productId)
    await user.save();

    res.status(200).json({
        message:'product deleted from cart'
    })
}

exports.updateItemFromCart=async(req,res)=>{
    const userId=req.user[0]._id;
    const productId=req.params.id;
    const quantity=req.body.quantity;

    if(!productId){
        return res.status(400).json({
            message:"please provide product id"
        })
    }

    // user maa xa cart so user fetch gareko
    const user=await userModel.findById(userId)

    // user ko cart maaa product xa ki nai check gareko
    const cartItem=user.cart.find((item)=>item.product.equals(productId));

    if(!cartItem){
        return res.status(400).json({
            message:'no product with that id'
        })
    }

    cartItem.quantity=quantity;
    await user.save();
    res.status(200).json({
        message:'item updated successfully',
        data:user.cart
    })
}