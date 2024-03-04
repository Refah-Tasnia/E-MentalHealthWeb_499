import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  NavbarBrand,
  Navbar,
  Nav,
  NavItem,
  NavLink,
  NavbarToggler,
  Collapse,
} from "reactstrap";
import Slider2 from "../../views/components/Slider2";
import Footer from "../footer/footer";
import SearchBar from "../../views/components/SearchBar";
import { FaList } from "react-icons/fa";
import axios from "axios";
const BannerHome = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUserID] = useState(null);

  const cardData = [
    {
      image: "src/assets/images/card1.jpeg",
      title: "Depression Test",
      link: "https://form.jotform.com/240493949889076",
      lessons: "43",
      students: "1536",
      levels: "All levels",
    },
    {
      image: "src/assets/images/stresss.jpeg",
      title: "Stress Test",
      link: "https://form.jotform.com/240542793880059?fbclid=IwAR3FIlWYb8HnUUwmJV-wBr0mjwg3f7btJaXE2mpjS0JU1vgbW0-8DX9hHAg",
      lessons: "35",
      students: "2472",
      levels: "All levels",
    },
    {
      image: "src/assets/images/traumaa.jpeg",
      title: "Trauma Test",
      link: "https://l.facebook.com/l.php?u=https%3A%2F%2Fform.jotform.com%2F240543163010036%3Ffbclid%3DIwAR0JeNI86ZTFZ7lmez5xNd2YwoAljxI9gyKRwPzpV0hUBer0CsEwEb3A1dA&h=AT0dSFuo1QrbvfLEFLmwykt_3BmXYivoRjupM8e3Ln6OQvfcexXOhkVGg1eC6olYXbtM68yr9ogoV1k6lQpgdi_c8x43ODK06C8NoyognTo7ZOkBE25oDRQHscR97mFszNeEp3nKVUs",
      lessons: "42",
      students: "4856",
      levels: "All levels",
    },
  ];

  useEffect(() => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.userData && response.data.userData.userName) {
          setUserID(response.data.userData.userName);
        } else {
          setUserID("Guest"); // Set a default value if userName is not available
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <div className="w-[100%] lg:h-[80vh] bg-[#0D1130]">
        <div className="text-black w-[90%] mx-auto">
          <div className="text-white lg:flex lg:justify-between lg:items-center sm:pt-[10px] lg:pt-[0px]">
            <div className="">
              <h3
                key={user}
                style={{
                  textAlign: "center",
                  fontFamily: "Lucida console", // Change the font family

                  fontWeight: "bold", // Set the font weight to bold
                  color: "white",
                }}
              >
                Welcome, {user}
              </h3>

              <p className="text-2xl font-medium pt-5">
                Find And Book The Best Doctors Near You
              </p>
              <div className="">
                <SearchBar />
              </div>
            </div>
            <div className="lg:pt-[80px] pt-5">
              <Slider2 className="" />
            </div>
          </div>
        </div>
      </div>
      <div className="lg:w-[70%] sm:w-full text-center mx-auto lg:h-[80vh] sm:h-[100vh] pt-14">
        <div className="text-[#0D1130] flex justify-center">
          <FaList className="mt-[6px] mx-2" />
          <h2 className="text-[#0D1130] text-xl">Our Tests</h2>
        </div>
        <h1 className="text-black font-medium">Evaluate your mental state</h1>
        <div
          id="three_cards"
          className="mt-5 lg:flex lg:justify-center lg:gap-10"
        >
          {cardData.map((item, index) => (
            <div
              key={index}
              id="one_card"
              className="mx-auto hover:scale-105 hover:transition-all hover:ease-in-out hover:duration-1000 h-[300px] w-[300px] bg-[white] border border-[red]"
            >
              <div>
                <img src={item.image} alt="card_image" />
              </div>
              <div>
                <h3>{item.title}</h3>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Take the test
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="sm:mt-[615px] md:mt-[615px] lg:mt-[25px] pl-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default BannerHome;
