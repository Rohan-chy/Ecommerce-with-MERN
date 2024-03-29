const express=require('express')
const { connectDb } = require('./database/database')
const authRoute=require('./routes/authRoutes')
const productRoute=require('./routes/productRoute')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//requiring dotenv
require('dotenv').config()

//database connection
connectDb();

//node js lai uploads folder ko access dina vaneko ho
app.use(express.static('./uploads'))

app.get('/',(req,res)=>{
    return res.status(200).json({
        message:"ok"
    })
})

//authentication route
app.use('',authRoute)

//admin product route
app.use('',productRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server startd at port ${process.env.PORT}`)
})