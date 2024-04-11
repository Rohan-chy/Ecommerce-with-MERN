import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import productSlice from "./productSlice";
import authSlice from "./authSlice";

const store=configureStore({
    reducer:{
        cart:cartSlice,
        products:productSlice,
        auth:authSlice
    }
})

export default store