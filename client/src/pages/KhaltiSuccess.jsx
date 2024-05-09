import React, { useEffect, useState } from 'react'
import { AunthenticatedAPI } from '../http'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearItem } from '../store/cartSlice'

const KhaltiSuccess = () => {
  const query=new URLSearchParams(location.search)
  const pidx=query.get('pidx')
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const verifyPidx=async()=>{
    try {
       const res=await AunthenticatedAPI.post('/payment/verifypidx',{pidx})
        if(res.status===200){
          setLoading(false)
          dispatch(clearItem())
          window.location.href='/'
        }
    } catch (error) {
      console.log("pidx verification error",error)
    }
  }

  useEffect(()=>{
    verifyPidx()
  },[])

  if(loading){
    return <div className="flex items-center justify-center">
    <div
      className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
      role="status">
      <span
        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        >Loading...</span
      >
    </div>
  </div>
  }
  
  
}

export default KhaltiSuccess