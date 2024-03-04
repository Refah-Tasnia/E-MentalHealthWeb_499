import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import DesktopNavbar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const menuOptions = [
  {
    title: "About Us",
    link: "/about",
  },

  {
    title: "Psychologists",
    link: "/psychologists",
  },
  {
    title: "Chatbot",
    link: "/chat",
  },
  {
    title: "Psychiatrist services",
    children: [
      {
        title: "Video Conferencing",
        link: "/VideoHome",
      },
      {
        title: "Book Psychologists",
        link: "/psychologists",
      },
    ],
  },
  {
    title: "Blog Posts",
    link: "/blog",
  },
  {
    title: "Home",
    link: "/",
  },
];

const socialLinks = [
  {
    icon: <FaFacebookSquare className="text-white text-[25px] pt-2" />,
    link: "facebook-link",
  },
  {
    icon: <FaTwitter className="text-white text-[25px] pt-2" />,
    link: "twitter-link",
  },
  {
    icon: <FaLinkedin className="text-white text-[25px] pt-2" />,
    link: "linkedin-link",
  },
  {
    icon: <FaYoutube className="text-white text-[25px] pt-2" />,
    link: "youtube-link",
  },
];

export default function HeaderMenu() {
  return (
    <header>
      <div id="usefulLinks" className="h-[30px] bg-[#171C49]">
        <div className="max-w-[90%] mx-auto">
          <div className="flex justify-between">
            <div className="flex text-white mt-1 font-medium">
              <MdEmail className="mt-0.5 text-[20px]" />
              <p className="px-1 lg:text-[15px] text-[14px]">
                info@mentalhealth.com
              </p>
              <p className="px-2 mr-1 lg:block hidden">|</p>
              <FaPhoneAlt className="mt-1 text-[16px] lg:block hidden" />
              <p className="px-1 lg:block hidden">Hotline: +8809638 505 505</p>
            </div>
            <div className="flex mt-1 font-medium">
              <IoMdPersonAdd className="text-[20px] text-[#fff] mt-0.5" />
              <Link
                to="/login"
                className="pl-2 pr-1 text-[#fff] hover:text-red-500"
              >
                Login
              </Link>
              <span>/</span>
              <Link
                to="/register"
                className="pl-1 text-[#fff] hover:text-red-500"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block ">
        <DesktopNavbar menuOptions={menuOptions} />
      </div>
      <div className="lg:hidden block">
        <MobileNavbar menuOptions={menuOptions} />
      </div>
    </header>
  );
}
