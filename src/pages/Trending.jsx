import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import useFetch from '../hooks/useFetch';
import Carousel from '../components/Carousel';

const Trending = () => {
  const [endpoint, setEndPoint] = useState("day");
  const { data, loading } = useFetch(`/trending/all/${endpoint}`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "day" ? "day" : "week")
  }

  return (
    <div className='relative mb-[70px]'>
      <div className='w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px] flex items-center justify-between mb-[20px]'>
        <span className='text-[28px] text-white font-fine'>Trending</span>
        <Tabs option1={"day"} option2={"week"} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} />
    </div>
  )
}

export default Trending