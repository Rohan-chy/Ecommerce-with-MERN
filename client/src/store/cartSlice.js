import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status";
import { AunthenticatedAPI } from "../http";


const cartSlice=createSlice({
    name:'cart',
    initialState:{
        items:[],
        status:STATUS.SUCCESS
    },
    reducers:{
        setItem(state,action){
            state.items=action.payload
        },
        setCartStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setItem,setCartStatus}=cartSlice.actions;

export default cartSlice.reducer;

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
        dispatch(setCartStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.post(`/cart/${productId}`)
            dispatch(setItem(res.data.data))
            dispatch(setCartStatus(STATUS.SUCCESS))
        } catch (error) {
            console.log("cart fetched error:",error)
            dispatch(setCartStatus(STATUS.ERROR))
        }
    }
}
// fetching all cart items
export function fetchCart(){
    return async function fetchCartThunk(dispatch){
        dispatch(setCartStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get(`/cart`)
            dispatch(setItem(res.data.data))
            dispatch(setCartStatus(STATUS.SUCCESS))
        } catch (error) {
            console.log("cart fetched error:",error)
            dispatch(setCartStatus(STATUS.ERROR))
        }
    }
}