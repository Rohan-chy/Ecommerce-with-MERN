import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from 'store/authSlice';

const ProtectedRoute = ({children}) => {
  const {data}=useSelector((state)=>state.auth)

  const dispatch=useDispatch()

  useEffect(()=>{
    if (data.length<1) { // Only fetch profile if data is not already available
      dispatch(fetchProfile());
    }
  },[dispatch, data])


  if(data&& data.role==='admin')
{
  return (
    <>{children}</>
  )
}
else {
  return <h1>You donot have permission</h1>
}
 
}

export default ProtectedRoute