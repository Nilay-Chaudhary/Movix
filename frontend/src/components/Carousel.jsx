import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import PosterFallback from "../assets/no-poster.png";
import loadinggif from "../assets/loading-gif.gif"
import CircleRating from "./CircleRating";
import Genres from "./Genres";

// endpoint needed for popular because popular api result doesnt have media type
const Carousel = ({data, loading, endpoint, title}) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    return (
        <div className="mb-[50px]">
            <div className="relative w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
                {title && <div className="text-[24px] text-white mb-[20px]">{title}</div>}
                {!loading ? (
                    <div className="flex gap-[10px] mr-[-10px] ml-[-10px] overflow-y-auto scrollbar-custom py-0 px-[20px] md:gap-[20px] md:overflow-auto md:m-0 md:p-0" >
                        {data?.map((item) => {
                            // console.log(item);
                            const posterUrl = item.poster_path ? url.image_path + item.poster_path : PosterFallback;
                            return (
                                <div key={item.id} className="w-[125px] cursor-pointer md:w-[25%] lg:w-[20%] shrink-0" onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)} >
                                    <div className="relative w-full flex hover:scale-[103%] items-end justify-between mb-[30px] aspect-[1/1.5] bg-cover bg-center p-[10px] duration-300">
                                        <img className="absolute p-1 left-0 top-0 w-full h-full overflow-hidden rounded-[15px] object-cover object-center" src={posterUrl} />
                                        {/* {console.log(item.vote_average.toFixed(1))} */}
                                        <div className="w-[40px] h-[40x] relative top-[30px] shrink-0 bg-white md:w-[50px] md:h-[50px] rounded-[50%] p-[2px] text-[34px]">
                                            <CircleRating rating={item.vote_average.toFixed(1)} />
                                        </div>
                                        {/* only first two genres are displayed */}
                                        <Genres data={item.genre_ids.slice(0, 2)} /> 
                                    </div>
                                    <div className="flex flex-col text-white">
                                        <span className="text-[16px] mb-[10px] md:text-[20px] leading-[24px] truncate">
                                            {item.title || item.name}
                                        </span>
                                        <span className="text-[14px] opacity-[0.5] mb-[20px]">
                                            {dayjs(item.release_date || item.first_air_date).format(
                                                "MMM D, YYYY"
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="w-full h-[300px] flex items-center justify-center text-white text-[14px] md:text-[20px]">
                        Loading&nbsp;
                        <img className="w-[30px]" src={loadinggif} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};


export default Carousel