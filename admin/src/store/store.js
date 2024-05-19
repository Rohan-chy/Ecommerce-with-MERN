import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import productSlice from "./productSlice";
import userSlice from "./userSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        orders:orderSlice,
        products:productSlice,
        users:userSlice
    }
})

export default store