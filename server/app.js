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

//authentication route
app.use('',authRoute)

//admin product route
app.use('',productRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server startd at port ${process.env.PORT}`)
})