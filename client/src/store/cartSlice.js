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
        },
        updateItem(state,action){
            // store maa xa ki nai check gareko ani kun index maa xa
            const index=state.items.findIndex((item)=>item.product._id===action.payload.productId)
            // array maa 0 index vneko pni auta item hunu ho so -1 check gareko
            if(index !==-1){
                // product vetiyo vne tyo index maa quantity update gardine
                state.items[index].quantity=action.payload.quantity;
            }
        },
        deleteItem(state,action){
            const index=state.items.findIndex((item)=>item.product._id===action.payload.productId)
            state.items.splice(index,1)
        }
    }
})

export const {setItem,setCartStatus,updateItem,deleteItem}=cartSlice.actions;

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

export function updateCart(productId,quantity){
    return async function updateCartThunk(dispatch){
        dispatch(setCartStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.patch(`/cart/${productId}`,{quantity})
            dispatch(updateItem({productId,quantity}))
            dispatch(setCartStatus(STATUS.SUCCESS))
        } catch (error) {
            console.log("cart fetched error:",error)
            dispatch(setCartStatus(STATUS.ERROR))
        } 
    }
}

export function deleteCart(productId){
    return async function deleteCartThunk(dispatch){
        dispatch(setCartStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.delete(`/cart/${productId}`)
            dispatch(deleteItem({productId}))
            dispatch(setCartStatus(STATUS.SUCCESS))
        } catch (error) {
            console.log("cart fetched error:",error)
            dispatch(setCartStatus(STATUS.ERROR))
        }
    }
}