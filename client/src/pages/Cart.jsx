import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { deleteCart, updateCart } from '../store/cartSlice'
import {Link} from 'react-router-dom'


const Cart = () => {
  const {items}=useSelector((state)=>state.cart)
  const totalItem=items.reduce((item,product)=>product.quantity + item,0)
  const totalPrice=items.reduce((amount,product)=>product.product.productPrice * product.quantity + amount,0)

  const dispatch=useDispatch();
  
  // increase & decrease quantity
  const handleQuantity=(productId,newQuantity)=>{
    dispatch(updateCart(productId,newQuantity))
  }

  // delete item from cart
  const deleteItem=(productId)=>{
    dispatch(deleteCart(productId))
  }
  
  return (
    <div className="h-screen bg-gray-100 pt-20">
    <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
    <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
      <div className="rounded-lg md:w-2/3">
        {
          items.map((value)=>(
            <div key={value.product._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
          <img src={value.product.productImage} alt="product-image" className="w-full rounded-lg sm:w-40" />
          <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
            <div className="mt-5 sm:mt-0">
              <h2 className="text-lg font-bold text-gray-900">{value.product.productName}</h2>
              <p className="mt-1 text-xs text-gray-700">{value.product.productDescription}</p>
            </div>
            <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
              <div className="flex items-center border-gray-100">
                <span onClick={()=>handleQuantity(value.product._id,value.quantity-1)} className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value={value.quantity} />
                <span onClick={()=>handleQuantity(value.product._id,value.quantity+1)} className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">Rs.{value.product.productPrice} </p>
                <svg onClick={()=>deleteItem(value.product._id)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>
          ))
        }
      </div>
      {/* <!-- Sub total --> */}
      <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
        <div className="mb-2 flex justify-between">
          <p className="text-gray-700">Total Items</p>
          <p className="text-gray-700">{totalItem}</p>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-lg font-bold">Total Price</p>
          <div className="">
            <p className="mb-1 text-lg font-bold">Rs.{totalPrice}</p>
            {/* <p className="text-sm text-gray-700">including VAT</p> */}
          </div>
        </div>
       <Link to={'/checkout'}> <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button></Link>
      </div>
    </div>
  </div>
  )
}

export default Cart