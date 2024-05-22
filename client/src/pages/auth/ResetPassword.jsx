import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from 'react-router-dom';
import { RESETPassword } from '../../store/authSlice';
import { STATUS } from '../../global/Status';

const ResetPassword = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {email,status}=useSelector((state)=>state.auth)
    const [newPassword,setNewPassword]=useState()
    const [confirmPassword,setConfirmPassword]=useState()

    const data={
        userEmail:email.userEmail,
        newPassword,
        confirmPassword
    }

    const handleReset=(e)=>{
        e.preventDefault();

        dispatch(RESETPassword(data))

        if(status===STATUS.SUCCESS){
            navigate('/login')
        }

    }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Login Form</h2>
      <form onSubmit={handleReset}>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">New Password</label>
          <input
            type="password"
            name="newPassword"
            onChange={(e)=>setNewPassword(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userPassword" className="block text-gray-700 font-semibold mb-2">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
            Change Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
