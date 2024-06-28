import React, { useEffect, useState } from 'react'
import FavoritesCard from '../components/FavoritesCard'

const Favorites = () => {
    const [movieData, setMovieData] = useState([])

    const fetchMyMovie = async () => {
        await fetch("https://movix-now.vercel.app", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            response = await response?.movieData?.movie_data;
            // console.log(response);
            setMovieData(response)
        })
    }

    useEffect(() => {
        fetchMyMovie()
    }, [movieData])

    return (
        <div className="mb-[50px] text-white mt-[90px]">
            <div className="relative w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
                {/* {console.log(movieData)} */}
                {movieData?.length > 0 ?
                    <>
                        <div className="text-[24px] text-white mb-[20px]">Your Favorites</div>

                        <div className="flex flex-wrap gap-[10px] mr-[-10px] ml-[-10px] overflow-y-auto scrollbar-custom py-0 px-[20px] md:gap-[20px] md:overflow-auto md:m-0 md:p-0" >
                            {movieData.map((item, index) => (
                                <FavoritesCard key={index} id={item[0]} title={item[2]} poster_path={item[1]} mediaType={item[3]} />
                            ))}
                        </div>
                    </> :
                    <div className='min-h-[300px] mt-[15%] text-white text-center m-auto text-[24px]'> Nothing to See Here</div>}
            </div>
        </div>
    )
}

export default Favorites