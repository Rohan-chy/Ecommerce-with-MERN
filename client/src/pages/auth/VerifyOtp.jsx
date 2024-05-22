import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { verifyotp } from '../../store/authSlice';
import { STATUS } from '../../global/Status';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const {email,status}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [otp,setOtp]=useState()
    console.log(email)

    const handleOtp=(e)=>{
        e.preventDefault()
        // hacks to convert string into integer i.e.string lai 1 sanga multiply garne,string lai agadi + sign rakhne
        dispatch(verifyotp(email.userEmail,otp*1))
        if(status===STATUS.SUCCESS){
            navigate('/resetpassword')
        }
    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Verify OTP</h2>
      <form onSubmit={handleOtp}>
        <div className="mb-4">
          <label htmlFor="userPassword" className="block text-gray-700 font-semibold mb-2">Enter otp</label>
          <input
            type="text"
            name="otp"
            onChange={(e)=>setOtp(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Verify Otp
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
