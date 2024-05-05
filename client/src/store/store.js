import { configureStore } from "@reduxjs/toolkit";
import cartSlice from './cartSlice'
import productSlice from "./productSlice";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";

const store=configureStore({
    reducer:{
        cart:cartSlice,
        products:productSlice,
        auth:authSlice,
        order:orderSlice
    }
})

export default store