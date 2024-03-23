/* eslint-disable react/prop-types */
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from "react-router-dom";

export default function DropDown({ item }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      key={item.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative text-base"
    >
      <Link
        className="flex gap-1 items-center text-[black] font-semibold hover:text-[#FF7E00] cursor-pointer"
        to={item.link}
      >
        {item.title}{" "}
        {item.children &&
          (isHovered ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />)}
      </Link>
      {item.children && isHovered && (
        <ul
          className="absolute top-full left-0 bg-[#F4F4F4] shadow-lg p-2 pt-4 z-50"
          style={{ minWidth: `${item.title.length * 8}px` }}
        >
          {item.children.map((childItem, index) => (
            <li key={index} className="pb-3">
              <Link
                className="text-[black] hover:text-[#FF7E00] font-medium"
                to={childItem.link}
              >
                {childItem.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
