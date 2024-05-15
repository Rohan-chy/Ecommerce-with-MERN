import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { loginUser } from 'store/authSlice';

const Login = () => {
    const dispatch=useDispatch()

    const {register,handleSubmit,formState}=useForm()

    const handleAdminLogin=(data)=>{
        dispatch(loginUser(data))
    }


  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-xl">
      <h2 className="text-2xl mb-4 font-bold">Login Form</h2>
      <form onSubmit={handleSubmit((data)=>{
        handleAdminLogin(data)
        // console.log(data)
      })}>
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-semibold mb-2">Email Address</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            {...register('userEmail',{required:'Email is required'})}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        <p className='text-[red]'>{formState.errors.userEmail && formState.errors.userEmail.message}</p>
        </div>
        <div className="mb-4">
          <label htmlFor="userPassword" className="block text-gray-700 font-semibold mb-2">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            {...register('userPassword',{required:'Password is required'})}
            className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-transparent"
            required
          />
        </div>
        <p className='text-[red]'>{formState.errors.userPassword && formState.errors.userPassword.message}</p>

        <button
          className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
