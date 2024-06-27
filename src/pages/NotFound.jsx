import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className='min-h-[300px] mt-[50%] text-white text-center m-auto ' onClick={() => navigate('/')}>Page Not Found. <br /> Click to Go Back</div>
    
  )
}

export default NotFound