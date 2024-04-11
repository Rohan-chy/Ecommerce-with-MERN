import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { API } from "../http"


const authSlice=createSlice({
    name:'auth',
    initialState:{
        data:[],
        status:STATUS.SUCCESS,
        message:'invalid credentials'
    },
    reducers:{
        setUsers(state,action){
            state.data=action.payload
        },
        setUserStatus(state,action){
            state.status=action.payload
        },
        setMessage(state,action){
            state.message=action.payload
        }
    }
})

export const {setUsers,setUserStatus,setMessage}=authSlice.actions;

export default authSlice.reducer;

// for registration
export function registerUser(data){
    return async function registerUserThunk(dispatch,getState){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/register',data)
            dispatch(setUsers(res.data.data))
            dispatch(setMessage(res.data.message))
            dispatch(setUserStatus(STATUS.SUCCESS))
        } catch (error) {
            console.log("registration error:",error)
            dispatch(setMessage(error.response.data.message))
            dispatch(setUserStatus(STATUS.ERROR))   
        }
    }
}

// for login
export function loginUser(data){
    return async function loginUserThunk(dispatch,getState){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/login',data)
            localStorage.setItem('token',res.data.token)
            dispatch(setMessage(res.data.message))
            // dispatch(setUserStatus(STATUS.SUCCESS))

        } catch (error) {
            console.log("login error:",error)
            dispatch(setUserStatus(STATUS.ERROR)) 
            dispatch(setMessage(error.response.data.message))
            
        }
    }
}