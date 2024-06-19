import React, { useState } from 'react'

const Tabs = ({option1, option2, onTabChange}) => {
    const [currentTab, setCurrentTab] = useState(option1);
    const changeDayTab = () => {
        if(currentTab === option1) return "bg-gradient-to-br from-[#f89e00] to-[#da2f68] text-white"
    }
    const changeWeekTab = () => {
        if(currentTab === option2) return "bg-gradient-to-br from-[#f89e00] to-[#da2f68] text-white"
    }

  return (
    <div className=' h-[34px] bg-white rounded-[20px] p-[2px]'>
        <div className='flex items-center h-[30px] relative gap-[3px]'>
            <div onClick={() => {
                if(currentTab === option2) onTabChange(option1);
                setCurrentTab(option1);
            }} className={`uppercase h-full w-[100px] flex items-center rounded-[15px] justify-center text-[14px] relative transition cursor-pointer ${changeDayTab()}`}>
                {option1}
            </div>
            <div onClick={() => {
                if(currentTab === option1) onTabChange(option2);
                setCurrentTab(option2);
            }} className={`uppercase h-full w-[100px] flex items-center rounded-[15px] justify-center text-[14px] relative transition cursor-pointer ${changeWeekTab()}`}>
                {option2}
            </div>
        </div>
    </div>
  )
}

export default Tabs