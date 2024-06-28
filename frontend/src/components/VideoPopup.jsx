import React from "react";
import ReactPlayer from "react-player/youtube";

const VideoPopup = ({ show, setShow, videoId, setVideoId }) => {
    const hidePopup = () => {
        setShow(false);
        setVideoId(null);
    };
    const showMain = () => {
        if(!show) return "hidden";
    }
    const showOpacity = () => {
        if(show) return "opacity-100"
    }
    const showPlayer = () => {
        if(!show) return "scale-[0.2]"
    }

    return (
        <div className={`flex justify-center items-center w-full h-full fixed top-0 left-0 opacity-100 visible z-20 ${showMain()}`}>
             <div className={`absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.25)] backdrop-blur-[2px] opacity-0 transition-opacity duration-300 ${showOpacity()}`} onClick={hidePopup}></div>
             <div className={`relative w-[800px] aspect-[16/9] bg-white transition-transform duration-300 ${showPlayer()}`}>
                 <span className={`absolute top-[-20px] right-0 text-white cursor-pointer mb-[10px]`} onClick={hidePopup}>
                    Click to Close
                 </span>
                 <ReactPlayer url={`https://www.youtube.com/watch?v=${videoId}`} height="100%" width="100%" controls
                 />
             </div>
        </div>
    );
};

export default VideoPopup;