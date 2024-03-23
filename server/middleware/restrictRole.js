const restrictRole=(...roles)=>{
    return (req,res,next)=>{

        //...roles le roles lai array banayera store garxa

        //req.user agadiko isAuthenticated bata aaera xa
        const userRole=req.user[0].role;

        if(!roles.includes(userRole)){
            return res.status(403).json({
                message:"doesnot have permission "
            })
        }

        next();
        // middleware le status respond gardaina . just next() matrai garne
    }
}

module.exports=restrictRole