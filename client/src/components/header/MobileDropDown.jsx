/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";

export default function MobileDropDown({ item }) {
  const [isOpened, setIsOpened] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropDown = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li key={item.title} ref={dropdownRef} className="relative">
      <Link
        onClick={() => toggleDropDown()}
        className="flex gap-1 items-center text-black text-[17px] font-medium"
        to={item.link}
      >
        {item.title}{" "}
        {item.children &&
          (isOpened ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />)}
      </Link>
      {item.children && isOpened && (
        <ul
          className="bg-white shadow-lg p-2"
          style={{ minWidth: `${item.title.length * 8}px` }}
        >
          {item.children.map((childItem, index) => (
            <li key={index} className="text-black">
              <Link to={childItem.link}>{childItem.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
