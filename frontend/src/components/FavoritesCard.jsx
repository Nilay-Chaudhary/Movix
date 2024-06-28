import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CircleRating from "./CircleRating";
import Genres from "./Genres";
import PosterFallback from "../assets/no-poster.png";
import "./styleMovie.css"



const FavoritesCard = ({ id, title, poster_path, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const removeFavHandler = async() => {
        let movieData = [id, poster_path, title, mediaType];
            let userEmail = localStorage.getItem("userEmail");
            await fetch("https://movix-now.vercel.app", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movie_data: movieData,
                    email: userEmail,
                })
            });
    }
    const posterUrl = poster_path ? url.image_path + poster_path : PosterFallback;

    return (
        <div className="w-[calc(50%-5px)] mb-[25px] cursor-pointer shrink-0 md:w-[calc(25%-15px)]" >
            <div className="relative w-full aspect-[1/1.3] hover:scale-[103%] bg-cover bg-center mb-[10px] flex datas-end justify-between p-[15px] duration-300" onClick={() => navigate(`/${mediaType}/${id}`)}>
                <img className="absolute  p-1 top-0 left-0 w-full h-full rounded-[12px] object-cover object-center" src={posterUrl} />
            </div>
            <div className="flex flex-col text-white">
                <span className="text-[16px] mb-[10px] md:text-[20px] leading-[24px] truncate " onClick={() => navigate(`/${mediaType}/${id}`)}>
                    {title}
                </span>
                <button onClick={removeFavHandler} className="bg-red-900 hover:bg-red-700 duration-300 rounded-[20px]">Remove From Favorites</button>
            </div>
        </div>
    );
};

export default FavoritesCard;
