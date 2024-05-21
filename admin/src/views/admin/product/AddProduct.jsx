import { STATUS } from 'global/Status'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createProduct } from 'store/productSlice'

const AddProduct = () => {
    const {register,handleSubmit,formState}=useForm()
    const {status}=useSelector((state)=>state.products)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const handleAddProduct=(data)=>{
        // product ko image array maa aaera xa so data lai spread garera product image file nikaleko
        data={...data,productImage:data.productImage[0]}
        dispatch(createProduct(data))

        if(status===STATUS.SUCCESS){
            navigate('/admin/products')
        }
    }

    
  return (
    <div className="max-w-[600px] mx-auto mt-10 p-6 bg-white rounded-lg shadow-md ">
    <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>
    <form onSubmit={handleSubmit((data)=>{
       handleAddProduct(data)
    })}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
          Product Name
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          {...register('productName',{required:'Produt name is required'})}
          required
        />
        <p className='text-[red]'>{formState.errors.productName && formState.errors.productName.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productDescription">
          Product Description
        </label>
        <textarea
          id="productDescription"
          name="productDescription"
          {...register('productDescription',{required:'Produt Description is required'})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
          required
        ></textarea>
        <p className='text-[red]'>{formState.errors.productDescription && formState.errors.productDescription.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productPrice">
          Product Price
        </label>
        <input
          type="number"
          name="productPrice"
          min={0}
          {...register('productPrice',{required:'Produt Price is required'})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className='text-[red]'>{formState.errors.productPrice && formState.errors.productPrice.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productQuantity">
          Product Quantity
        </label>
        <input
          type="number"
          name="productQuantity"
          min={0}
          {...register('productQuantity',{required:'Produt quantity is required'})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className='text-[red]'>{formState.errors.productQuantity && formState.errors.productQuantity}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productStatus">
          Product Status
        </label>
        <select
          id="productStatus"
          name="productStatus"
          {...register('productStatus',{required:'Produt status is required'})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
        <p className='text-[red]'>{formState.errors.productStatus && formState.errors.productStatus.message}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productQuantity">
          Product Image
        </label>
        <input
          type="file"
          name="productImage"
          {...register('productImage',{required:'Product image is required'})}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <p className='text-[red]'>{formState.errors.productImage && formState.errors.productImage.message}</p>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        ADD PRODUCT
      </button>
    </form>
  </div>
  )
}

export default AddProduct