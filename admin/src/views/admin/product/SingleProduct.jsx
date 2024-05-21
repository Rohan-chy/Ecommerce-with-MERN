import { AunthenticatedAPI } from 'http';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

const SingleProduct = () => {
  const {id}=useParams();
  const {products}=useSelector((state)=>state.products)

  const [orderFetch,setOrerFetch]=useState([])

  // auta product id ko matrai details chahiyeko so filter gareko
  const filteredSingleproductDetail=products?.filter((product)=>product._id===id)
  console.log(filteredSingleproductDetail)

  const fetchOrderOfProduct=async()=>{
    try {
      const res=await AunthenticatedAPI.get(`/productOrders/${id}`)
    if(res.status===200){
      setOrerFetch(res.data.data)
    }
    } catch (error) {
      console.log('order fetched of product error:',error)
    }
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
              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{product.productStatus}</p>
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
         <div >
            <h1>Edit product status</h1>
            <select  className=" rounded  border-2  border-blue-600 block appearance-none w-full   py-2 px-4 pr-8 leading-tight focus:outline-none ">
                            <option value={'available'}>available</option>
                            <option value={'unavailable'}>unavailable</option>
          </select>
         </div>
        </div>
      </div>
    </div>
  </div>

  <div>
    <h1>Orders</h1>
    <table className="min-w-full leading-normal ">
                        <thead>
                            <tr>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order Id
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    User name
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Total Amt
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Order Status
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Payment Status
                                </th>
                                <th
                                    className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Ordered At
                                </th>
                            </tr>
                        </thead>
                        <tbody >
                            {
                                orderFetch && orderFetch.length>0 && orderFetch.map((order)=>(
                                <tr key={order._id}>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 w-10 h-10">
                                            <img className="w-full h-full rounded-full"
                                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                                alt="" />
                                        </div>
                                             <div className="ml-3">
                                                <p className="text-[blue] whitespace-no-wrap underline">
                                                    {order._id}
                                                </p>
                                            </div>
                                    </div>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p className="text-gray-900 whitespace-no-wrap ">{order?.userId?.userName}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p className="text-gray-900 whitespace-no-wrap ">{order.totalAmount}</p>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {order.orderStatus}
                                    </p>
                                </td>
                                
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <span
                                        className={`relative inline-block px-3 py-1 font-semibold ${order.paymentDetails.paymentStatus==='paid'?'text-green-900':'text-red-500'} leading-tight`}>
                                        <span aria-hidden
                                            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                        <span className="relative">{order.paymentDetails.paymentStatus}({order.paymentDetails.method})</span>
                                    </span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-left">
                                    <p className="text-gray-900 whitespace-no-wrap">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </td>
                            </tr>
                                ))
                            }
                        </tbody>
                    </table>
  </div>
</div>
  )
}

export default SingleProduct