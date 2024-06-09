import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import {
  FaFacebookSquare,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import DesktopNavbar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";

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

const HeaderMenu = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("http://localhost:3001/login", {
        withCredentials: true,
      });
      if (response.data.userData) {
        setUserData(response.data.userData);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3001/logout",
        {},
        { withCredentials: true }
      );
      setUserData(null); // Clear user data
      console.log("Logging out..."); // Debugging
      window.location.reload(); // Refresh the page
      console.log("Page refreshed"); // Debugging
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Define menu options based on the value of 'psyName'
  let menuOptions = [
    {
      title: "Home",
      link: "/",
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
      title: "About Us",
      link: "/about",
    },
  ];

  // If 'userData' is defined and 'psyName' starts with "Dr.", modify menu options accordingly
  if (userData && userData.psyName && userData.psyName.startsWith("Dr.")) {
    menuOptions = [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "Video Conferencing",
        link: "/videoHome",
      },
      {
        title: "Prescribe",
        link: "/presc",
      },
      {
        title: "Appointments",
        link: "/appoint",
      },
      // Add more custom menu options if needed
    ];
  }

  return (
    <header>
      {/* Useful Links */}
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
              {userData ? (
                <button
                  onClick={handleLogout}
                  className="pl-2 pr-1 text-[#fff] hover:text-red-500"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="pl-2 pr-1 text-[#fff] hover:text-red-500"
                  >
                    Login
                  </Link>
                  <span className="px-1 text-[#fff]">/</span>
                  <Link
                    to="/register"
                    className="pl-1 text-[#fff] hover:text-red-500"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden lg:block">
        <DesktopNavbar menuOptions={menuOptions} />
      </div>
      <div className="lg:hidden block">
        <MobileNavbar menuOptions={menuOptions} />
      </div>
    </header>
  );
};

export default HeaderMenu;
