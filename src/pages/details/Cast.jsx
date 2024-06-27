import React from "react";
import { useSelector } from "react-redux";
import avatar from "../../assets/avatar.png";
import loadinggif from "../../assets/loading-gif.gif"

const Cast = ({ data, loading, mediaType }) => {
    const { url } = useSelector((state) => state.home);

    return (
        <div className="relative mb-[50px]">
            <div className="w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
                <div className="text-[24px] text-white mb-[25px]">Top Cast</div>
                {!loading ? (
                    <div className="flex gap-[20px] overflow-y-hidden scrollbar-custom mx-[-20px] py-0 px-[20px] md:m-0 md:p-0">
                        {data?.map((item) => {
                            let imgUrl = item?.profile_path ? url?.image_path + item?.profile_path : avatar;
                            return (
                                <div key={item.id} className="text-center text-white">
                                    <div className="w-[125px] h-[125px] rounded-[50%] overflow-hidden mb-[15px] md:w-[175px] md:h-[175px] md:mb-[25px]">
                                        <img className="w-full h-full object-cover object-center block" src={imgUrl} />
                                    </div>
                                    <div className="text-[14px] leading-[20px] font-600 md:text-[18px] md:leading-[24px]">{item.name}</div>
                                    <div className="text-[14px] leading-[20px] opacity-[0.5] md:text-[16px] md:leading-[24px]">
                                        {mediaType === "movie" ? item?.character : item?.roles[0]?.character}
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

export default Cast;