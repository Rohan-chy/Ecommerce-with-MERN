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
        },
        deleteItem(state,action){
            const index=state.orders.findIndex((order)=>order._id===action.payload.orderId)
            state.orders.splice(index,1)  
        },
        updateItem(state,action){
            const index=state.orders.findIndex((order)=>order._id===action.payload.orderId)
            if(index!==-1){
                state.orders[index].orderStatus=action.payload.orderStatus;
            }
        }
    }
})

export const {setStatus,setOrders,deleteItem,updateItem}=orderSlice.actions

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

export function orderDelete(orderId){
    return async function orderDeleteThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.delete(`/admin/orders/${orderId}`)
            if(res.status===200){
                dispatch(deleteItem({orderId}))
                dispatch(setStatus(STATUS.SUCCESS))
            }

        } catch (error) {
            console.log('admin order delete error',error)
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}
export function orderUpdate(orderId,orderStatus){
    return async function orderUpdateThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.patch(`/admin/orders/${orderId}`,{orderStatus})
            if(res.status===200){
                dispatch(updateItem({orderId,orderStatus}))
                dispatch(setStatus(STATUS.SUCCESS))
            }

        } catch (error) {
            console.log('admin order update error',error)
            dispatch(setStatus(STATUS.ERROR))
        }
    }
}


