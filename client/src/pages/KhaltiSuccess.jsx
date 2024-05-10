import React, { useEffect, useState } from 'react'
import { AunthenticatedAPI } from '../http'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearItem } from '../store/cartSlice'
import Loader from '../global/Loader'

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
    return <Loader/>
  }
  
  
}

export default KhaltiSuccess