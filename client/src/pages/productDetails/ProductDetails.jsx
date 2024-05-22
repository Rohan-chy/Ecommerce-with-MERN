import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import { STATUS } from '../../global/Status'

const ProductDetails = () => {
  const id=useParams().id;
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {data:user}=useSelector((state)=>state.auth)
  const {data:details,status}=useSelector((state)=>state.products)

  console.log(details)
  const singleProduct=details.filter((product)=>product._id===id)
  console.log(singleProduct,'single')


  const addCart=(productId)=>{
    if(user.length==0 && (localStorage.getItem('token')=='' || localStorage.getItem('token')==null || localStorage.getItem('token')==undefined)){
      return navigate('/login')
    }

    dispatch(addToCart(productId))
    if(status===STATUS.SUCCESS){
      navigate('/cart')
    }
  }
  
 

  return (
<div className="flex min-h-screen items-center justify-center bg-gray-100">
  {
    singleProduct?.map((item,i)=>(
      <div key={item._id} className="flex font-sans">
    <div className="flex-none w-48 relative">
      <img src={item.productImage} alt="" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
    </div>
    <form className="flex-auto p-6">
      <div className="flex flex-wrap">
        <h1 className="flex-auto text-xl font-semibold text-gray-900">
         {item.productName}
        </h1>
        <div className="text-lg font-semibold text-black-500">
          ${item.productPrice}
        </div>
        <div className="w-full flex-none text-sm font-medium text-black-700 mt-2">
          In stock
        </div>
      </div>
      <div className="flex items-baseline mt-4 mb-6 pb-6 border-b border-slate-200">
        <div className="space-x-2 flex text-sm">
          <label>
            <input className="sr-only peer" name="size" type="radio" value="xs" />
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              XS
            </div>
          </label>
          <label>
            <input className="sr-only peer" name="size" type="radio" value="s" />
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              S
            </div>
          </label>
          <label>
            <input className="sr-only peer" name="size" type="radio" value="m" checked/>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              M
            </div>
          </label>
          <label>
            <input className="sr-only peer" name="size" type="radio" value="l" />
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              L
            </div>
          </label>
          <label>
            <input className="sr-only peer" name="size" type="radio" value="xl" />
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-700 peer-checked:font-semibold peer-checked:bg-slate-900 peer-checked:text-white">
              XL
            </div>
          </label>
        </div>
      </div>
      <div className="flex space-x-4 mb-6 text-sm font-medium">
        <div className="flex-auto flex space-x-4">
          {
            item.productQuantity > 0 ?
            <button onClick={()=>addCart(item._id)} className="h-10 px-6 font-semibold rounded-md border border-balck-800 text-white bg-red-500 hover:opacity-80" >
            Add to cart
          </button> :
          <button disabled className="h-10 px-6 font-semibold rounded-md border border-balck-800 text-white bg-red-500 hover:opacity-80" >
          Out of Stock
        </button>
          }
          
        </div>
      </div>
    </form>
  </div>
    ))
  }
</div>
  )
}

export default ProductDetails