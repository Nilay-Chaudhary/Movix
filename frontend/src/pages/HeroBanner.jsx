import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useFetch from '../hooks/useFetch';

const HeroBanner = () => {
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const {url} = useSelector((state) => state.home);

  const {data, loading} = useFetch("/movie/popular");

  useEffect(() => {
    // use optional chaining (?.) to bypass error thrown when data is not present or use try-catch 
    const iconUrl = data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
    let backdrop = "";
    if(iconUrl) backdrop = "https://image.tmdb.org/t/p/original" + iconUrl;
    setBackground(backdrop);
  }, [data]) 

  const searchHandler = (e) => {
    console.log(e);
    if(e.key === "Enter" && query.length > 0){
      // console.log(query);
      navigate(`/search/${query}`)
    }
  }
  const searchFromButton = () => {
    if(query.length > 0)navigate(`/search/${query}`)
  }

  return (
    <div className='w-[100%] h-[450px] flex items-center relative md:h-[700px] bg-[#04152d] text-white'>

      <div className='flex items-center justify-center w-[100%] h-[100%] absolute top-0 left-0 opacity-[0.5] overflow-hidden'>
        <img className={`blur-[0.7px]`} src={ !loading && background.length>0 ? background : "/movix-logo.png" } alt="" />
      </div>

      <div className='w-[100%] h-[250px] bg-gradient-to-b from-[rgba(4,21,5,0)] to-[rgba(4,21,45,1)] absolute bottom-0 left-0'></div>

      <div className='w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]'>
        <div className="flex flex-col items-center text-white text-center relative max-w-[800px] my-0 mx-auto">

          <span className='text-[50px] font-bold mb-10 md:mb-0 md:text-[90px]'>Welcome! </span>
          <span className='text-[18px] font-[500] mb-[40px] md:{text-[24px] }'>Millions of movies and TV shows to discover. Explore now!</span>

          <div className='flex items-center w-[100%]'>
            <input className='caret-zinc-500 text-zinc-500 w-[85%] h-[50px] bg-white outline-0 border-0 rounded-l-[30px] py-0 px-[15px] text-[14px] md:w-[80%] md:h-[60px] md:text-[20px] md:py-0 md:px-[30px]' onKeyUp={searchHandler} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search for a movie or TV show'/>
            <button onClick={searchFromButton} className='rounded-r-[30px] bg-gradient-to-br from-[#f89e00] to-[#da2f68] w-[15%] h-[50px] text-[16px] md:h-[60px] md:text-[18px] md:w-[20%]'>Search</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HeroBanner