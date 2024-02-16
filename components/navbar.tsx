import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./navbarItem";

import { FaBell, FaChevronDown, FaChevronUp, FaSearch } from "react-icons/fa";
import { BsDot } from "react-icons/bs";
import AccountMenu from "./AccountMenu";
import Image from "next/image";

export default function Navbar() {
  const TOP_OFFSET = 66;
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      console.log(window.scrollY);
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const togglVisible = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);
  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);
  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-6 py-6 md:px-16 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img src="/images/logo.png" alt="logo" className="h-6 lg:h-8" />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="TV shows" />
          <NavbarItem label="Movies" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={togglVisible}
          className="lg:hidden relative flex flex-row items-center gap-2 ml-8 cursor-pointer"
        >
          <p className="text-white text-sm">Browser</p>

          <FaChevronUp
            className={`text-white transition ${
              showMobileMenu ? "rotate-180" : "rotate-0"
            }`}
          />

          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className=" flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 transition  cursor-pointer">
            <FaSearch className="text-white transition" />
          </div>
          <div className="text-gray-200 relative hover:text-gray-300 transition  cursor-pointer">
            <FaBell className="text-white transition" />
            <BsDot
              className=" absolute bottom-1 left-1 text-red-600"
              size={20}
            />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-9 rounded-md overflow-hidden">
              <Image src="/images/default-blue.png" alt="profile" />
            </div>
            <FaChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? "rotate-180" : "rotate-0"
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
}
