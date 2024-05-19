import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "global/Status"
import { AunthenticatedAPI } from "http"


const userSlice=createSlice({
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
        },
        removeUser(state,action){
            const index=state.users.findIndex((user)=>user._id===action.payload.id)
            if(index!==-1){
                state.users.splice(index,1)
            }
        }
    }
})

export const {setStatus,setUsers,removeUser}=userSlice.actions

export default userSlice.reducer;


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
export function deleteUserById(id){
    return async function deleteUserThunk(dispatch){
        dispatch(setStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.delete(`/admin/users/${id}`)
            if(res.status===200){
                dispatch(removeUser({id}))
                 dispatch(setStatus(STATUS.SUCCESS))
            }
        } catch (error) {
           console.log("user deletedd error:",error);
           dispatch(setStatus(STATUS.ERROR)) 
        }
    }
}


