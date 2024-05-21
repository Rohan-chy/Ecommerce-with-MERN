import { AunthenticatedAPI } from 'http';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const {id}=useParams();
  const {products}=useSelector((state)=>state.products)

  // auta product id ko matrai details chahiyeko so filter gareko
  const filteredSingleproductDetail=products?.filter((product)=>product._id===id)
  console.log(filteredSingleproductDetail)

  const fetchOrderOfProduct=async()=>{
    const res=await AunthenticatedAPI.get(`/productOrders/${id}`)
    console.log(res.data)
  }

  useEffect(()=>{
    fetchOrderOfProduct()
  },[])


  // const handleproductstatus=(e)=>{
  //   dispatch(productUpdate(id,e.target.value))
  // }

  // const handlePaymentStatus=(e)=>{
  //   dispatch(paymentUpdate(id,e.target.value))
  // }

  return (
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

  <div className="flex justify-start product-start space-y-2 flex-col">
    <h1 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">product {id}</h1>
    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{new Date(filteredSingleproductDetail[0]?.createdAt).toLocaleString()}</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center products-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start products-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start products-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
        {
          filteredSingleproductDetail && filteredSingleproductDetail.length>0 && filteredSingleproductDetail.map((product)=>(
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start products-start md:products-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src={product.productImage} alt="dress" />
            <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
          </div>
          <div className="bproduct-b bproduct-gray-200 md:flex-row flex-col flex justify-between products-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start products-start space-y-8">
              <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{product.productName}</h3>
              <div className="flex justify-start products-start flex-col space-y-2">
                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Desc: </span>{product.productDescription}</p>
              </div>
            </div>
            <div className="flex justify-between space-x-8 products-start w-full">
              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{product.productPrice} per product</p>
              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">QTY:{product.productQuantity}</p>
            </div>
          </div>
        </div>
          ))
        }
      </div>
    </div>
    <div className="h-[400px] bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between products-center md:products-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <div className=" flex flex-col md:flex-row xl:flex-col justify-start products-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full products-stretch w-full flex-col mt-6 md:mt-0">
         <div className='my-4'>
            <h1>Edit product status</h1>
            <select  className=" rounded  border-2  border-blue-600 block appearance-none w-full   py-2 px-4 pr-8 leading-tight focus:outline-none ">
                            <option value={'available'}>available</option>
                            <option value={'unavailable'}>unavailable</option>
          </select>
         </div>
          <div className='my-4'>
            <h1>Edit payment status</h1>
            <select  className=" rounded  bproduct-2  bproduct-blue-600 block appearance-none w-full   py-2 px-4 pr-8 leading-tight focus:outline-none ">
                            <option value='pending'>pending</option>
                            <option value={'paid'}>paid</option>
                            <option value={'unpaid'}>unpaid</option>
          </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default SingleProduct