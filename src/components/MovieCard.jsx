import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png";
import "./styleMovie.css"

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data?.poster_path ? url.image_path + data?.poster_path : PosterFallback;
    return (
        <div className="w-[calc(50%-5px)] mb-[25px] cursor-pointer shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]" onClick={() => navigate(`/${data.media_type || mediaType}/${data.id}`)}>
            <div class="relative w-full aspect-[1/1.5] hover:scale-[103%] bg-cover bg-center mb-[30px] flex datas-end justify-between p-[15px] duration-300">
                <img className="absolute  p-1 top-0 left-0 w-full h-full rounded-[12px] object-cover object-center" src={posterUrl} />
                {!fromSearch && (
                    <>
                        <div className="relative w-full h-full flex items-end justify-between">
                            <div className="w-[40px] h-[40x] relative top-[30px] shrink-0 bg-white md:w-[50px] md:h-[50px] rounded-[50%] p-[2px] text-[34px]">
                                <CircleRating rating={data.vote_average.toFixed(1)} />
                            </div>
                            <div className="hidden relative md:flex md:flex-wrap md:justify-end">
                                <Genres data={data.genre_ids.slice(0, 2)} /> 
                            </div>
                        </div>
                    </>
                )} 

                
            </div>
            <div className="flex flex-col text-white">
                <span className="text-[16px] mb-[10px] md:text-[20px] leading-[24px] truncate">
                    {data.title || data.name}
                </span>
                <span className="text-[14px] opacity-[0.5] mb-[20px]">
                    {dayjs(data.release_date || data.first_air_date).format(
                        "MMM D, YYYY"
                    )}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
