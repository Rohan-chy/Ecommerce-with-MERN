import { createSlice } from "@reduxjs/toolkit"
import { STATUS } from "../global/Status"
import { API } from "../http"


const authSlice=createSlice({
    name:'auth',
    initialState:{
        data:[],
        status:STATUS.SUCCESS,
        message:'',
        email:''
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
        },
        setEmail(state,action){
            state.email=action.payload
        }
    }
})

export const {setUsers,setUserStatus,setMessage,logoutUser,setEmail}=authSlice.actions;

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
export function forgetPassword(userEmail){
    return async function forgetPasswordThunk(dispatch){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/forgotpassword',{userEmail})
            if(res.status>=200 && res.status<=300){
                dispatch(setEmail({userEmail}))
                dispatch(setMessage(res.data.message))
                 dispatch(setUserStatus(STATUS.SUCCESS))

            }

        } catch (error) {
            console.log("forget password error:",error)
            dispatch(setMessage(error.response.data.message))
            dispatch(setUserStatus(STATUS.ERROR)) 
            
        }
    }
}
export function verifyotp(userEmail,otp){
    return async function verifyotpThunk(dispatch){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/verifyOtp',{userEmail,otp})
            if(res.status>=200 && res.status<=300){
                dispatch(setMessage(res.data.message))
                 dispatch(setUserStatus(STATUS.SUCCESS))

            }

        } catch (error) {
            console.log("verify otp error:",error)
            dispatch(setMessage(error.response.data.message))
            dispatch(setUserStatus(STATUS.ERROR)) 
            
        }
    }
}
export function RESETPassword(data){
    return async function RESETPasswordThunk(dispatch){
        dispatch(setUserStatus(STATUS.LOADING))
        try {
            const res=await API.post('/resetPassword',data)
            if(res.status>=200 && res.status<=300){
                dispatch(setMessage(res.data.message))
                 dispatch(setUserStatus(STATUS.SUCCESS))

            }

        } catch (error) {
            console.log("reset password error:",error)
            dispatch(setMessage(error.response.data.message))
            dispatch(setUserStatus(STATUS.ERROR)) 
            
        }
    }
}