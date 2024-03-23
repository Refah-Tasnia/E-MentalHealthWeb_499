/* eslint-disable react/prop-types */
import { useState } from "react";

import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";
import MobileDropDown from "./MobileDropDown";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logos/mental-health.png";

export default function MobileNavbar({ menuOptions }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (!e.target.closest(".mobile-navbar")) {
      closeMenu();
    }
  };

  return (
    <>
      <div
        className={`mobile-navbar bg-[white] text-white py-4 `}
        onClick={handleOutsideClick}
      >
        <div className="flex justify-between items-center px-4 rounded-full">
          <Link to="/">
            <img
              src={logo}
              alt=""
              className="h-12 rounded-full"
            />
          </Link>
          <button className="block lg:hidden text-[black]" onClick={toggleMenu}>
            {isMenuOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <RxHamburgerMenu className="text-2xl" />
            )}
          </button>
        </div>
        <ul
          className={`lg:hidden px-4 mt-4 space-y-2 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          {menuOptions.map((item) => (
            <MobileDropDown key={item.title} item={item} />
          ))}
        </ul>
      </div>
    </>
  );
}
