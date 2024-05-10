import React, { useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { fetchProducts } from '../store/productSlice';
import { Link } from 'react-router-dom';
import Loader from '../global/Loader';

const Home = () => {
    const dispatch=useDispatch();
    const {data:product,status}=useSelector((state)=>state.products)

    useEffect(()=>{
        dispatch(fetchProducts())
    },[])

    // const addToCart=(product)=>{
    //     dispatch(add(product))
    // }

    if(status=='loading'){
      return <Loader/>
    }

    if(status=='error'){
      return <div>Error....</div>
    }

  return (
 <>


{/* Title  */}
<div className="pt-32  bg-white">
<h1 className="text-center text-2xl font-bold text-gray-800">All Products</h1>
</div>

 {/* Product List  */}
<section className="py-10 bg-gray-100">
<div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
    {
        product?.map((item)=>(
            <article key={item._id} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <div className="relative flex items-end overflow-hidden rounded-xl">
      <Link to={`/productdetails/${item._id}`}>
          <img src={item.productImage} alt="Hotel Photo" />
      </Link>

        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">{item.productName}</h2>
          <p className="mt-1 text-sm text-slate-400">{product.productDescription}</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">${item.productPrice}</p>

            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>

              {/* <button onClick={()=>addToCart(item)} className="text-sm">Add to cart</button> */}
            </div>
          </div>
        </div>
    </article>
        ))
    }
</div>
</section>
 </>
  )
}

export default Home