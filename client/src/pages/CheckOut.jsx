import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { createOrder } from '../store/orderSlice'
import { STATUS } from '../global/Status'
import { AunthenticatedAPI } from '../http'
import { clearItem } from '../store/cartSlice'

const CheckOut = () => {
    const {items}=useSelector((state)=>state.cart)
    const {data,status}=useSelector((state)=>state.order)
    const {register,handleSubmit,formState}=useForm()
    const [paymentMethod,setPaymentMethod]=useState('COD')
    console.log(data)

    const subTotal=items.reduce((total,item)=>item.quantity*item.product.productPrice+total,0)
    const shippingAmount=100;
    const totalAmount=subTotal+shippingAmount;

    const paymentChange=(e)=>{
        setPaymentMethod(e.target.value)
    }

    const dispatch=useDispatch()
    const navigate=useNavigate()

    // for COD
    const handleOrder=(data)=>{
       const {phoneNumber,shippingAddress}=data;
       
       const orderDetails={
        shippingAddress:shippingAddress,
        phoneNumber:phoneNumber,
        items:items,
        totalAmount:totalAmount,
        paymentDetails:{
            method:paymentMethod
        }
       }
       dispatch(createOrder(orderDetails))
       dispatch(clearItem())
       navigate('/')
    }

    // for khalti payment gateway
    const khaltiPayment=()=>{
      const currentData=data[data.length-1];

      if(status===STATUS.SUCCESS && paymentMethod==='COD'){
        return alert('order placed successfully')
      }

      if(status===STATUS.SUCCESS && paymentMethod==='Khalti'){
        const {totalAmount,_id}=currentData;
        handleKhalti(totalAmount,_id)
      }

    }

    useEffect(()=>{
      khaltiPayment()
    },[data,status])

    const handleKhalti=async(totalAmount,_id)=>{
      try {
        const res=await AunthenticatedAPI.post('/payment',{amount:totalAmount,orderId:_id})
         console.log("inititate khalti payment",res.data)
         if(res.status===200){
          window.location.href=res.data.paymentUrl
         }
      } catch (error) {
        console.log("khalti initiation error",error)
      }
    }
  return (
    <>
    
    <div className="mt-[50px] flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
  <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
    <div className="relative">
      <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700" href="#"
            ><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg
          ></a>
          <span className="font-semibold text-gray-900">Shop</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2" href="#">2</a>
          <span className="font-semibold text-gray-900">Shipping</span>
        </li>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <li className="flex items-center space-x-3 text-left sm:space-x-4">
          <a className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white" href="#">3</a>
          <span className="font-semibold text-gray-500">Payment</span>
        </li>
      </ul>
    </div>
  </div>
</div>
<div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
  <div className="px-4 pt-8">
    <p className="text-xl font-medium">Order Summary</p>
    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
      {
        items&&items.map((item,i)=>(
            <div key={i} className="flex flex-col rounded-lg bg-white sm:flex-row">
        <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={item.product.productImage} alt="" />
        <div className="flex w-full flex-col px-4 py-4">
          <span className="font-semibold">{item.product.productName}</span>
          <span className="float-right text-gray-400">QTY: {item.quantity}</span>
          <p className="text-lg font-bold">Rs.{item.product.productPrice}</p>
        </div>
      </div>
        ))
      }
    </div>

    <p className="mt-8 text-lg font-medium">Shipping Methods</p>
    <form className="mt-5 grid gap-6">
      <div className="relative">
        <input className="peer hidden" id="radio_1" type="radio" name="radio" checked={paymentMethod=='COD'} value='COD' onChange={paymentChange}/>
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_1">
          <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">COD(Cash On Delivery)</span>
          </div>
        </label>
      </div>
      <div className="relative">
        <input className="peer hidden" id="radio_2" type="radio" name="radio" checked={paymentMethod=='Khalti'} value={'Khalti'} onChange={paymentChange}/>
        <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
        <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" for="radio_2">
          <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
          <div className="ml-5">
            <span className="mt-2 font-semibold">Khalti</span>
          </div>
        </label>
      </div>
    </form>
  </div>
  <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
    <p className="text-xl font-medium">Payment Details</p>
    <p className="text-gray-400">Complete your order by providing your payment details.</p>
      <form onSubmit={handleSubmit((data)=>{
        handleOrder(data)
        // console.log(data)
      })}>
      <div className="">
      <label for="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
      <div className="relative">
        <input type="text" name="email" {...register('email',{required:'Email is required'})} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" stroke-linejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        </div>
        <p className='text-[red]'>{formState.errors.email && formState.errors.email.message}</p>
      </div>
      <label for="card-holder" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
      <div className="relative">
        <input type="text" name="phoneNumber" {...register('phoneNumber',{required:"Phone number is required"})} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your phone number" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
        <p className='text-[red]'>{formState.errors.phoneNumber && formState.errors.phoneNumber.message}</p>
      </div>
      <label for="billing-address" className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
      <div className="relative">
        <input type="text" name="shippingAddress" {...register('shippingAddress',{required:'Shipping Address is required'})} className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Shipping Address" />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
          </svg>
        </div>
        <p className='text-[red]'>{formState.errors.shippingAddress && formState.errors.shippingAddress.message}</p>
      </div>
      <div className="mt-6 border-t border-b py-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Subtotal</p>
          <p className="font-semibold text-gray-900">Rs.{subTotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Shipping</p>
          <p className="font-semibold text-gray-900">Rs.{shippingAmount}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-gray-900">Total</p>
        <p className="text-2xl font-semibold text-gray-900">Rs.{totalAmount}</p>
      </div>
    </div>

    {
      paymentMethod=='COD'?
    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
      :
    <button className="mt-4 mb-8 w-full rounded-md bg-[purple] px-6 py-3 font-medium text-white">Pay with Khalti</button>
    }
      </form>
  </div>
</div>

    </>
  )
}

export default CheckOut