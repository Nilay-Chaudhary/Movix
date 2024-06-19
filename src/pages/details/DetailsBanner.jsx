import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import useFetch from "../../hooks/useFetch.jsx";
import Genres from '../../components/Genres.jsx'
import CircleRating from '../../components/CircleRating.jsx'
import PosterFallback from "../../assets/no-poster.png"
import loadinggif from "../../assets/loading-gif.gif"
import { FaRegPlayCircle } from "react-icons/fa";
import VideoPopup from "../../components/VideoPopup";
import "./style.css";

const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}`);
    console.log(data);
    const { url } = useSelector((state) => state.home);

    const genres = data?.genres?.map((genre) => genre.id);

    const director = crew?.filter((person) => person.job === "Director");
    const writer = crew?.filter(
        (person) => person.job === "Writer" || person.job === "Screenplay"
    );

    const formattedTime = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="w-full pt-[100px] mb-[50px] bg-[#04152d] md:mb-0 md:pt-[120px] md:min-w-[700px]">
            {!loading ? (
                        <>
                            <div className="w-full h-full absolute left-0 top-0 opacity-[0.1] overflow-hidden">
                                <img className="w-full h-full object-cover object-center" src={url.image_path + data?.backdrop_path} />
                                {/* {console.log(url.image_path + data?.backdrop_path)} */}
                            </div>
                            <div className="w-full h-[25px] absolute left-0 bottom-0 bg-gradient-to-b from-[rgba(4,21,5,0)] to-[rgba(4,21,45,1)]"></div>
                            <div className="w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
                                <div className="flex flex-col md:flex-row relative gap-[25px] ">
                                    <div className="shrink-0 ">
                                        {/* {console.log(data)} */}
                                        {data?.poster_path ? (
                                            <img className="w-full block rounded-[12px] md:max-w-[350px]" src={url.image_path + data?.poster_path} />
                                        ) : (
                                            <img className="w-full block rounded-[12px] md:max-w-[350px]" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="text-white">
                                        <div className="text-[28px] leading-[40px] md:text-[34px] md:leading-[44px]">
                                            {`${ data?.name || data?.title} (${dayjs(data?.release_date || data?.first_air_date).format("YYYY")})`}
                                        </div>
                                        <div className="text-[16px] mb-[15px] leading-[24px] opacity-0.5 italic md:text-[20px]">
                                            {data?.tagline}
                                        </div>
                                        <div className="mb-[25px] flex flex-wrap">
                                            <Genres data={genres} />
                                        </div>

                                        <div className="flex items-center gap-[25px] mb-[25px]">
                                            <CircleRating rating={data?.vote_average.toFixed(1)} />
                                            <div className="flex items-center gap-[20px] cursor-pointer hover:text-[#da2f68] duration-300" onClick={() => {setShow(true); setVideoId(video.key)}} >
                                                <FaRegPlayCircle size={"90px"} />
                                                <span className="text-[20px]">
                                                    Watch Trailer
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-[25px]">
                                            <div className="text-[24px] mb-[10px]">
                                                Overview
                                            </div>
                                            <div className="leading-[24px] md:pr-[100px]">
                                                {data?.overview}
                                            </div>
                                        </div>

                                        <div className="border-b-[2px] border-[rgba(255,255,255,0.1)] py-[15px] px-0 flex">
                                            {data?.status && (
                                                <div className="mr-[10px] flex flex-wrap">
                                                    <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                        Status:
                                                    </span>
                                                    <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                        {data?.status}
                                                    </span>
                                                </div>
                                            )}

                                            {(data?.release_date || data?.first_air_date) && (
                                                <div className="mr-[10px] flex flex-wrap">
                                                    <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                        Release Date:
                                                    </span>
                                                    <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                        {dayjs((data?.release_date || data?.first_air_date)).format("MMM D, YYYY")}
                                                    </span>
                                                </div>
                                            )}

                                            {data?.runtime ? (
                                                <div className="mr-[10px] flex flex-wrap">
                                                    <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                        Runtime:
                                                    </span>
                                                    <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                        {formattedTime(data?.runtime)}
                                                    </span>
                                                </div>
                                            ) : (
                                                <>
                                                <div className="mr-[10px] flex flex-wrap">
                                                    <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                        No. of Seasons:
                                                    </span>
                                                    <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                        {data?.number_of_seasons}
                                                    </span>
                                                </div>
                                                <div className="mr-[10px] flex flex-wrap">
                                                    <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                        Total Episdoes:
                                                    </span>
                                                    <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                        {data?.number_of_episodes}
                                                    </span>
                                                </div>
                                                </>
                                            )}
                                        </div>

                                        {director?.length > 0 && (
                                            <div className="border-b-[2px] border-[rgba(255,255,255,0.1)] py-[15px] px-0 flex">
                                                <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                    Director:{" "}
                                                </span>
                                                <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                    {director?.map((d, i) => ( <span key={i}> 
                                                        {d.name} {director.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {writer?.length > 0 && (
                                            <div className="border-b-[2px] border-[rgba(255,255,255,0.1)] py-[15px] px-0 flex">
                                                <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                    Writer:{" "}
                                                </span>
                                                <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                    {writer?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name} {writer.length - 1 !== i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}

                                        {data?.created_by?.length > 0 && (
                                            <div className="border-b-[2px] border-[rgba(255,255,255,0.1)] py-[15px] px-0 flex">
                                                <span className="mr-[10px] leading-[24px] font-[600] opacity-[1]">
                                                    Creator:{" "}
                                                </span>
                                                <span className="mr-[10px] opacity-[0.5] leading-[24px]">
                                                    {data?.created_by?.map( (d, i) => (
                                                            <span key={i}>
                                                                {d.name}
                                                                {data?.created_by.length - 1 !== i && ", "}
                                                            </span>
                                                        )
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </div>
                </>
            ) : (
                <div className="w-full h-[100px] flex items-center justify-center text-white text-[14px] md:text-[20px]">
                        Loading&nbsp;
                        <img className="w-[30px]" src={loadinggif} alt="" />
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;