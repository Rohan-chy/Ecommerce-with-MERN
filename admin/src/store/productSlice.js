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
        },
        removeProduct(state,action){
            const index=state.products.findIndex((product)=>product._id===action.payload.productId)
            state.products.splice(index,1)
        },
        addNewProduct(state,action){
            state.products.push(action.payload)
        }
    }
})

export const {setStatus,setProducts,removeProduct,addNewProduct}=productSlice.actions

export default productSlice.reducer;


export function createProduct(data){
    return async function createProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.post(`/product`,data,{
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            })
            if(res.status===200){
                dispatch(addNewProduct(res.data.data))
                dispatch(setStatus(STATUS.SUCCESS))
            }
        } catch (error) {
           console.log("product created error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}

export function fetchProduct(){
    return async function fetchProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/product')
            dispatch(setProducts(res.data?.products?.reverse()))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("product fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


export function deleteProduct(productId){
    return async function deleteProductThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.delete(`/admin/product/${productId}`)
            if(res.status===200){
                dispatch(removeProduct({productId}))
                dispatch(setStatus(STATUS.SUCCESS))
            }
        } catch (error) {
           console.log("product deleted error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}



