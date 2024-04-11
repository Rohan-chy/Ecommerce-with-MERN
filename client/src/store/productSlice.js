import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { API } from "../http"


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
            const res=await API.get('/product/')
            dispatch(setProduct(res.data.products))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("redux data fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


