import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import orderSlice from "./orderSlice";
import userSlice from "./userSlice";

const store=configureStore({
    reducer:{
        auth:authSlice,
        orders:orderSlice,
        users:userSlice
    }
})

export default store