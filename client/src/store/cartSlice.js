import { createSlice } from "@reduxjs/toolkit"


const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        add(state,action){
            state.push(action.payload)
        },
        remove(state,action){
            return state.filter((prev)=>prev._id !== action.payload)
        }
    }
})

export const {add,remove}=cartSlice.actions;

export default cartSlice.reducer;