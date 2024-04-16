import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { API } from "../http"


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

// for registration
export function registerUser(data){
    return async function registerUserThunk(dispatch,getState){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/register',data)
            // console.log(res)
            if(res.status>=200 && res.status<=300){
                dispatch(setUsers(res.data.data))
                 dispatch(setMessage(res.data.message))
            }
            dispatch(setUserStatus(STATUS.SUCCESS))

        } catch (error) {
            console.log("registration error:",error)
            if(error.response.status>=400){
                dispatch(setMessage(error.response.data.message))
            }
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
            if(res.status>=200 && res.status<=300){
                dispatch(setUsers(res.data.data))
                localStorage.setItem('token',res.data.token)
                dispatch(setMessage(res.data.message))
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