import React from "react";
import loadinggif from '../assets/loading-gif.gif'

const Spinner = () => {
    return (
        <div className='w-full h-full'>
            <img className='h-[60px] mx-auto' src={loadinggif} alt="Loading..." />
        </div>
    );
};

export default Spinner;