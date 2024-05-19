import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom'
import { paymentUpdate } from 'store/orderSlice';
import { orderUpdate } from 'store/orderSlice';
import { orderDelete } from 'store/orderSlice';

const OrderDetails = () => {
  const {id}=useParams();
  const {orders}=useSelector((state)=>state.orders)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  // auta order id ko matrai details chahiyeko so filter gareko
  const filteredSingleOrderDetail=orders?.filter((order)=>order._id===id)
  console.log(filteredSingleOrderDetail)

  const subTotal=filteredSingleOrderDetail[0]?.items?.reduce((total,item)=>item.quantity*item.product?.productPrice+total,0)


  const handleDelete=()=>{
    dispatch(orderDelete(id))
    navigate('/admin/orders')
  }

  const handleOrderStatus=(e)=>{
    dispatch(orderUpdate(id,e.target.value))
  }

  const handlePaymentStatus=(e)=>{
    dispatch(paymentUpdate(id,e.target.value))
  }

  return (
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

  <div className="flex justify-start item-start space-y-2 flex-col">
    <h1 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">Order {id}</h1>
    <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">{new Date(filteredSingleOrderDetail[0]?.createdAt).toLocaleString()}</p>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Customer’s Cart</p>
        {
          filteredSingleOrderDetail && filteredSingleOrderDetail[0]?.items?.length>0 && filteredSingleOrderDetail[0]?.items?.map((item)=>(
            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="pb-4 md:pb-8 w-full md:w-40">
            <img className="w-full hidden md:block" src={item.product?.productImage} alt="dress" />
            <img className="w-full md:hidden" src="https://i.ibb.co/L039qbN/Rectangle-10.png" alt="dress" />
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{item.product?.productName}</h3>
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Desc: </span>{item.product?.productDescription}</p>
              </div>
            </div>
            <div className="flex justify-between space-x-8 items-start w-full">
              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item.product?.productPrice} per item</p>
              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">QTY:{item.quantity}</p>
              <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">Rs.{item.product?.productPrice * item.quantity}</p>
            </div>
          </div>
        </div>
          ))
        }
      </div>
      <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Payment Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredSingleOrderDetail[0]?.paymentDetails.paymentStatus}({filteredSingleOrderDetail[0]?.paymentDetails.method})</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Order Status</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{filteredSingleOrderDetail[0]?.orderStatus}</p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.{subTotal}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">Rs.100</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">Rs.{filteredSingleOrderDetail[0]?.totalAmount}</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">Rs.100</p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button className="hover:bg-black dark:bg-white dark:text-gray-800 dark:hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 py-5 w-96 md:w-full bg-gray-800 text-base font-medium leading-4 text-white">View Carrier Details</button>
          </div>
        </div>
      </div>
    </div>
    <div className="h-[400px] bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div className=" flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Name: {filteredSingleOrderDetail[0]?.userId?.userName}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Email: {filteredSingleOrderDetail[0]?.userId?.userEmail}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Phone: {filteredSingleOrderDetail[0]?.userId?.userNumber}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{filteredSingleOrderDetail[0]?.shippingAddress}</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">{filteredSingleOrderDetail[0]?.shippingAddress}</p>
            </div>
          </div>
         <div className='my-4'>
            <h1>Edit order status</h1>
            <select onChange={handleOrderStatus} className=" rounded  border-2  border-blue-600 block appearance-none w-full   py-2 px-4 pr-8 leading-tight focus:outline-none ">
                            <option value='pending'>pending</option>
                            <option value={'on the way'}>on the way</option>
                            <option value={'delivered'}>delivered</option>
                            <option value={'preparation'}>preparation</option>
                            <option value={'cancelled'}>cancelled</option>
          </select>
         </div>
          <div className='my-4'>
            <h1>Edit payment status</h1>
            <select onChange={handlePaymentStatus} className=" rounded  border-2  border-blue-600 block appearance-none w-full   py-2 px-4 pr-8 leading-tight focus:outline-none ">
                            <option value='pending'>pending</option>
                            <option value={'paid'}>paid</option>
                            <option value={'unpaid'}>unpaid</option>
          </select>
          </div>
          <div className="flex w-full justify-center items-center md:justify-start md:items-start gap-1">
            {
              filteredSingleOrderDetail[0]?.orderStatus !=='cancelled' &&
            <button onClick={handleDelete} className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent dark:text-white py-5 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 bg-[red] text-white">Delete Order</button>
            }
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default OrderDetails