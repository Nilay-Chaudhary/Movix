import React from "react";
import { useSelector } from "react-redux";

const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className="hidden relative md:flex md:justify-end md:gap-[5px] md:flex-wrap whitespace-nowrap">
            {data?.map((g) => {
                // console.log(g);
                if (!genres[g]?.name) return;
                return (
                    <div key={g} className="bg-[#da2f68] py-[3px] px-[5px] text-[12px] rounded-[4px] text-white ">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;