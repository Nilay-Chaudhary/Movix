import React, { useEffect, useState } from 'react'
import Tabs from '../components/Tabs'
import useFetch from '../hooks/useFetch';
import Carousel from '../components/Carousel';

const Popular = () => {
  const [endpoint, setEndPoint] = useState("movie");
  const { data, loading } = useFetch(`/${endpoint}/popular`);

  const onTabChange = (tab) => {
    setEndPoint(tab === "movie" ? "movie" : "tv")
  }

  return (
    <div className='relative mb-[70px]'>
      <div className='w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px] flex items-center justify-between mb-[20px]'>
        <span className='text-[28px] text-white font-fine'>What's Popular</span>
        <Tabs option1={"movie"} option2={"tv"} onTabChange={onTabChange} />
      </div>
      <Carousel data={data?.results} loading={loading} endpoint={endpoint}/>
    </div>
  )
}

export default Popular