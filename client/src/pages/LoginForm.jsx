import React, { useState } from 'react';
import {useDispatch,useSelector} from "react-redux"
import { loginUser } from '../store/authSlice';
import { STATUS } from '../global/Status';
import {useNavigate} from 'react-router-dom'

const LoginForm = () => {

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {status,message}=useSelector((state)=>state.auth)
    console.log(message)

  const [formData, setFormData] = useState({
    userEmail: '',
    userPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    dispatch(loginUser(formData))

    if(message==='login success'){
        return navigate('/')
    }


    if(message!='login success'){
        alert(message)
        return navigate('/login')
    }

  
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="userPassword" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
