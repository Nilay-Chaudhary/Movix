import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-[#020c1b] py-[50px] px-0 text-white relative">
            <div className="w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px] flex flex-col items-center">
                <ul className="list-none flex items-center justify-center gap-[15px] mb-[20px] md:gap-[30px] md:mb-[30px]">
                    <li className="cursor-pointer text-[12px] duration-300 md:text-[16px] hover:text-[#da2f68]">Terms Of Use</li>
                    <li className="cursor-pointer text-[12px] duration-300 md:text-[16px] hover:text-[#da2f68]">Privacy-Policy</li>
                    <li className="cursor-pointer text-[12px] duration-300 md:text-[16px] hover:text-[#da2f68]">About</li>
                    <li className="cursor-pointer text-[12px] duration-300 md:text-[16px] hover:text-[#da2f68]">Blog</li>
                    <li className="cursor-pointer text-[12px] duration-300 md:text-[16px] hover:text-[#da2f68]">FAQ</li>
                </ul>
                <div className="text-[14px] text-center mb-[20px] max-w-[800px] opacity-[0.5] leading-[20px]">
                DISCLAIMER: This site is not affiliated with, sponsored by, or endorsed by any third-party companies mentioned on this website. 
                All product names, logos, and brands are the property of their respective owners. 
                All company, product, and service names used in this website are for identification purposes only. 
                Use of these names, logos, and brands does not imply endorsement. 
                We make no representation or warranty regarding the accuracy, reliability, or suitability of any 
                information provided on third-party websites linked to from this site.
                </div>
                <div className="flex items-center justify-center gap-[13px] ">
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center duration-300 hover:text-[#da2f68] ">
                        <FaFacebookF size= {"25px"}/>
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center duration-300 hover:text-[#da2f68] ">
                        <FaInstagram size= {"25px"}/>
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center duration-300 hover:text-[#da2f68] ">
                        <FaTwitter size= {"25px"}/>
                    </span>
                    <span className="w-[50px] h-[50px] rounded-[50%] bg-[#04152d] flex items-center justify-center duration-300 hover:text-[#da2f68] ">
                        <FaLinkedin size= {"25px"}/>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;