import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const controlNavbar = () => {
    if (window.scrollY > 400) {
      if (window.scrollY > lastScrollY && !mobileMenu) setShow("hide");
      else setShow("show");
    }
    else setShow("top");
    setLastScrollY(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => { // return to unmount event listener to prevent memory leaks. cleanup function
      window.removeEventListener("scroll", controlNavbar);
    }
  }, [lastScrollY])

  useEffect(() => {
    window.scrollTo(0, 0);   // scroll to top when route changes
  }, [location])

  const searchHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setShowSearch(false);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") navigate("explore/movie");
    else if (type === "home") navigate("/");
    else if (type === "tv") navigate("/explore/tv");
    else if (type === "login") navigate("/login");
    else if (type === "signup") navigate("/signup");
    else if(type === "favorites") navigate("/favorites")
    setMobileMenu(false);
  }

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userEmail");
    navigate("/");
  }


  const openSearch = () => {
    setShowSearch(!showSearch);
    setMobileMenu(false);
  }
  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    setShowSearch(false);
  }

  // items in drop-down list. hidden if hamburger is closed, visible if open and flexed above md size
  const showMobileMenuMenuItems = () => {
    if (mobileMenu) return "flex flex-col absolute top-[60px] left-0 bg-[#020c1b] w-[100%] py-[20px] px-0 divide-white border-solid border-t-[1px]"
    else return "hidden"
  }
  // styling of items in drop-down
  const showMobileMenuMenuItem = () => {
    if (mobileMenu) return "text-[20px] w-[100%] h-auto py-[15px] px-[20px] m-0 flex flex-col items-start bg-[#020c1b]"
    else return "flex items-center"
  }
  // hide the last child ie search icon in drop-down
  const showMobileMenuMenuItemSearch = () => {
    if (mobileMenu) return "hidden"
  }
  // hamburger icons dont disappear until the menu is closed, even if width increases to md
  const showMobileMenuCancel = () => {
    if (mobileMenu == false) return "md:hidden"
  }

  const headerShow = () => {
    if (show === "top") return "bg-[rgba(0,0,0,0.25)] backdrop-blur-[3px]";
    else if (show === "show") return "bg-[#020c1b]";
    else return "translate-y-[-60px]";
  }

  return (
    <header className={`fixed top-0 left-0 w-[100%] h-[60px] flex items-center translate-y-0 transition-all ease duration-[0.5] z-10 ${headerShow()}`}>
      <div className="flex items-center justify-between w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">

        <div className="cursor-pointer h-[100%]">
          <img className="w-[200px]" onClick={() => navigationHandler("home")} src={logo} alt="" />
        </div>
        {/* careful property overriding, Movies TV and Search icon*/}
        <ul className={`list-none items-center ${showMobileMenuMenuItems()} md:flex`}>
          <li onClick={() => navigationHandler("movie")} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>Movies</li>
          <li onClick={() => navigationHandler("tv")} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>TV shows</li>
          {!localStorage.getItem("authToken") ?
            <>
              <li onClick={() => navigationHandler("signup")} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>Sign Up</li>
              <li onClick={() => navigationHandler("login")} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>Login</li>
            </>
            : 
            <>
              <li onClick={() => navigationHandler("favorites")} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>Favorites</li>
              <li onClick={logoutHandler} className={`cursor-pointer h-[60px] my-0 mx-[15px] text-red-600 font-[500] relative hover:text-[#da2f68] duration-100 ${showMobileMenuMenuItem()}`}>Log Out</li>
            </>
          }
          <li onClick={openSearch} className={`cursor-pointer h-[60px] flex items-center my-0 mx-[15px] text-white font-[500] relative hover:text-[#da2f68] duration-100 mr-0 ${showMobileMenuMenuItemSearch()} `}> <HiOutlineSearch size={"18px"} /> </li>
        </ul>
        {/* different buttons on right for smaller than size md */}
        <div className={`flex items-center gap-[20px] ${showMobileMenuCancel()} text-white`}>
          <HiOutlineSearch size={"18px"} onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose size={"18px"} onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu size={"18px"} onClick={openMobileMenu} />
          )}
        </div>

      </div>
      {/* search bar when search icon is clicked */}
      {showSearch && (<div className="w-[100%] h-[60px] bg-white absolute top-[60px]">
        <div className="w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]">
          <div className="flex items-center h-[40px] mt-[10px] w-[100%]">
            <input className='caret-zinc-500 text-zinc-500 w-[100%] h-[50px] bg-white outline-0 border-0 rounded-l-[30px] py-0 px-[15px] text-[14px] md:h-[60px] md:text-[20px] md:py-0 md:px-[30px]' onKeyUp={searchHandler} onChange={(e) => setQuery(e.target.value)} type="text" placeholder='Search for a movie or TV show' />
            <VscChromeClose className="ml-[10px] flex-shrink cursor-pointer" size={"20px"} onClick={() => setShowSearch(false)} />
          </div>
        </div>
      </div>
      )}

    </header>
  );
};

export default Header;