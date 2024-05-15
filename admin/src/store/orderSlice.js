import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "global/Status"
import { AunthenticatedAPI } from "http"


const orderSlice=createSlice({
    name:'order',
    initialState:{
        status:STATUS.SUCCESS,
        orders:[]
    },
    reducers:{
        setStatus(state,action){
            state.status=action.payload
        },
        setOrders(state,action){
            state.orders=action.payload
        }
    }
})

export const {setStatus,setOrders}=orderSlice.actions

export default orderSlice.reducer;


export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/admin/orders')
            dispatch(setOrders(res.data.data))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("order fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


