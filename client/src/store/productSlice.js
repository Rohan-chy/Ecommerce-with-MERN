import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// Object.freeze method le object lai freeze garxa modify garna didaina write garna didaina just read matrai garna dinxa 
const STATUS=Object.freeze({
    SUCCESS:'success',
    LOADING:'loading',
    ERROR:'error'
})


const productSlice=createSlice({
    name:'product',
    initialState:{
        data:[],
        status:STATUS.SUCCESS
    },
    reducers:{
        setProduct(state,action){
            state.data=action.payload
        },
        setStatus(state,action){
            state.status=action.payload
        }
    }
})

export const {setProduct,setStatus}=productSlice.actions

export default productSlice.reducer;


export function fetchProducts(){
    return async function fetchProductsThunk(dispatch,getState){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await axios.get('http://localhost:5000/product/')
            dispatch(setProduct(res.data.products))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("redux data fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


