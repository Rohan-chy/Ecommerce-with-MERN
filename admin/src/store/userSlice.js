import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "global/Status"
import { AunthenticatedAPI } from "http"


const orderSlice=createSlice({
    name:'users',
    initialState:{
        status:STATUS.SUCCESS,
        users:[]
    },
    reducers:{
        setStatus(state,action){
            state.status=action.payload
        },
        setUsers(state,action){
            state.users=action.payload
        }
    }
})

export const {setStatus,setUsers}=orderSlice.actions

export default orderSlice.reducer;


export function fetchUser(){
    return async function fetchUserThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/admin/users')
            dispatch(setUsers(res.data.data))
            dispatch(setStatus(STATUS.SUCCESS))
        } catch (error) {
           console.log("user fetched error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


