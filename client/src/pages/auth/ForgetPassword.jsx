import React, { useEffect, useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { forgetPassword } from '../../store/authSlice';
import { STATUS } from '../../global/Status';
import {useNavigate} from 'react-router-dom'

const ForgetPassword = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate();
    const {status}=useSelector((state)=>state.auth)

    const [email,setEmail]=useState('')

    const handleForget=(e)=>{
        e.preventDefault();
        dispatch(forgetPassword(email))
        
        if(status===STATUS.SUCCESS){
            navigate('/verifyotp')
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Forget Password Form</h2>
      <form onSubmit={handleForget}>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            name="userEmail"
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Send Otp
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
