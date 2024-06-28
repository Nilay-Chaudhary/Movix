import React, { useState } from "react";
import VideoPopup from "../../components/VideoPopup";
import { FaRegPlayCircle } from "react-icons/fa";
import loadinggif from "../../assets/loading-gif.gif"

const VideosSection = ({ data, loading }) => {
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    return (
        <div className="relative mb-[50px]">
            <div className="w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
                <div className="text-[24px] text-white mb-[25px]">Official Videos</div>
                {!loading ? (
                    <div className="flex gap-[10px] overflow-x-auto scrollbar-custom mx-[-20px] py-0 px-[20px] md:gap-[20px] md:m-0 md:p-0">
                        {data?.results?.map((video) => (
                            <div
                                key={video.id}
                                className="w-[150px] shrink-0 md:w-[25%] cursor-pointer"
                                onClick={() => {
                                    setVideoId(video.key);
                                    setShow(true);
                                }}
                            >
                                <div className="mb-[15px] relative hover:scale-[103%] duration-200">
                                    <img className="p-1 w-[100%] block rounded-[14px]" src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`} />
                                    <FaRegPlayCircle className="translate-x-[-50%] translate-y-[-50%] text-white opacity-[0.7] absolute top-[50%] left-[50%] w-[50px] h-[50px]" />
                                </div>
                                <div className="text-white text-[14px] leading-[20px] mb-[20px] md:leading-[24px] md:text-[16px]">{video.name}</div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-[300px] flex items-center justify-center text-white text-[14px] md:text-[20px]">
                        Loading&nbsp;
                        <img className="w-[30px]" src={loadinggif} alt="" />
                    </div>
                )}
            </div>
            <VideoPopup
                show={show}
                setShow={setShow}
                videoId={videoId}
                setVideoId={setVideoId}
            />
        </div>
    );
};

export default VideosSection;