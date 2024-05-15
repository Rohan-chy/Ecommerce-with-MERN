import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { API, AunthenticatedAPI } from "../http"


const authSlice=createSlice({
    name:'auth',
    initialState:{
        data:[],
        status:STATUS.SUCCESS,
        message:''
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
        },
        logoutUser(state,action){
            state.data=[]
        }
    }
})

export const {setUsers,setUserStatus,setMessage,logoutUser}=authSlice.actions;

export default authSlice.reducer;


// for login
export function loginUser(data){
    return async function loginUserThunk(dispatch,getState){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/login',data)
            if(res.status>=200 && res.status<=300){
                dispatch(setUsers(res.data.data))
                localStorage.setItem('token',res.data.token)
                dispatch(setMessage(res.data.message))
                window.location.href='/admin'

            }
            dispatch(setUserStatus(STATUS.SUCCESS))

        } catch (error) {
            console.log("login error:",error)
            if(error.response.status>=400){
                dispatch(setMessage(error.response.data.message))
            }
            dispatch(setUserStatus(STATUS.ERROR)) 
            
        }
    }
}


//fetch profile
export function fetchProfile(){
    return async function fetchProfileThunk(dispatch){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await AunthenticatedAPI.get('/profile')
            if(res.status>=200 && res.status<=300){
                dispatch(setUsers(res.data.data))
                dispatch(setMessage(res.data.message))

            }
            dispatch(setUserStatus(STATUS.SUCCESS))
        } catch (error) {
          console.log('fetch profile error',error)
          dispatch(setUserStatus(STATUS.ERROR)) 
        }
    }
}