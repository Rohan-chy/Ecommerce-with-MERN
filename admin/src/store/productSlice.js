import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "global/Status"
import { AunthenticatedAPI } from "http"


const productSlice=createSlice({
    name:'products',
    initialState:{
        status:STATUS.SUCCESS,
        products:[]
    },
    reducers:{
        setStatus(state,action){
            state.status=action.payload
        },
        setProducts(state,action){
            state.products=action.payload
        }
    }
})

export const {setStatus,setProducts}=productSlice.actions

export default productSlice.reducer;


export function fetchProduct(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/product')
            dispatch(setProducts(res.data.products.reverse()))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("product fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


