import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../store/authSlice';
import { fetchCart } from '../store/cartSlice';

const Navbar = () => {
    // reading cart value from store
    const {items}=useSelector((state)=>state.cart)
    const {data:user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const logOut=()=>{
        dispatch(logoutUser())
        localStorage.removeItem('token')
        navigate('/login')
    }

    // refresh garda cart length 0 hune vayeko le server bata fetch garera length render gareko
    useEffect(()=>{
        dispatch(fetchCart())
    },[])


  return (
<div className="relative w-full">
    <nav className="fixed z-10 w-full bg-white md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
            <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
                <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
                    <Link to={'/'} className="flex space-x-2 items-center">
                        <img src="https://tailus.io/sources/blocks/food-delivery/preview/images/icon.png" className="w-12" alt="tailus logo" width="144" height="133"/>
                        <span className="text-2xl font-bold text-yellow-900">Rohan <span className="text-yellow-700">Ecommerce</span></span>
                    </Link >

                    <button aria-label="humburger" id="hamburger" className="relative w-10 h-10 -mr-2 lg:hidden">
                        <div aria-hidden="true" id="line" className="inset-0 w-6 h-0.5 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                        <div aria-hidden="true" id="line2" className="inset-0 w-6 h-0.5 mt-2 m-auto rounded bg-yellow-900 transtion duration-300"></div>
                    </button>
                </div>

                <div className="hidden w-full lg:flex flex-wrap justify-end items-center space-y-6 p-6 rounded-xl bg-white md:space-y-0 md:p-0 md:flex-nowrap md:bg-transparent lg:w-7/12">
                    <div className="text-gray-600 lg:pr-4">
                        <ul className="space-y-6 tracking-wide font-medium text-sm md:flex md:space-y-0">
                            <li>
                                <Link to="/profile" className="block md:px-4 transition hover:text-yellow-700">
                                    <span>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <p href="#" className="block md:px-4 transition hover:text-yellow-700">
                                    <span>Wishlist</span>
                                </p>
                            </li>
                            <li>
                                {items && items.length > 0 && <p href="#" className="block md:px-4 transition hover:text-yellow-700">
                                    <Link to={'/cart'}>Cart <sup>{items.length}</sup></Link >
                                </p>}
                            </li>
                        </ul>
                    </div>

                    <div className="w-full space-y-2 border-yellow-200 lg:space-y-0 md:w-max lg:border-l">
                       {
                        user.length==0 && (localStorage.getItem('token')=='' || localStorage.getItem('token')==null || localStorage.getItem('token')==undefined) ?
                        <>
                         <button type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200 focus:bg-yellow-100 sm:w-max">
                            <Link to={'/register'} className="block text-yellow-800 font-semibold text-sm">
                                Sign up
                            </Link>
                        </button>
                        <button type="button" title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                            <Link to={'/login'} className="block text-yellow-900 font-semibold text-sm">
                                Login
                            </Link>
                        </button>
                        </>:
                        <button type="button" onClick={logOut} title="Start buying" className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max">
                        <span className="block text-yellow-900 font-semibold text-sm" >
                            Logout
                        </span>
                    </button>
                       }
                    </div>
                </div>
            </div>
        </div>
    </nav>
   
</div>
  )
}

export default Navbar