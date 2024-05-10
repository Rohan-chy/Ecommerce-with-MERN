import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { AunthenticatedAPI } from "../http"


const orderSlice=createSlice({
    name:'order',
    initialState:{
        data:[],
        status:STATUS.SUCCESS,
        orders:[]
    },
    reducers:{
        setOrder(state,action){
            state.data.push(action.payload)
        },
        setStatus(state,action){
            state.status=action.payload
        },
        setOrders(state,action){
            state.orders=action.payload
        }
    }
})

export const {setOrder,setStatus,setOrders}=orderSlice.actions

export default orderSlice.reducer;


export function createOrder(data){
    return async function createOrderThunk(dispatch,getState){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.post('/orders',data)
            dispatch(setOrder(res.data.data))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("order created error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}
export function fetchOrder(){
    return async function fetchOrderThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/orders')
            dispatch(setOrders(res.data.data))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("order fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


