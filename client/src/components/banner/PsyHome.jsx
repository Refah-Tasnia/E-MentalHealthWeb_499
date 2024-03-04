import React, { useState, useEffect } from "react";

import Slider2 from "../../views/components/Slider2";
import Footer from "../footer/footer";
import SearchBar from "../../views/components/SearchBar";
import { FaList } from "react-icons/fa";
import axios from "axios";
const PsyHome = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUserID] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.userData && response.data.userData.psyName) {
          setUserID(response.data.userData.psyName);
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
              <a href="/presc">Prescription</a>
              <p className="text-2xl font-medium pt-5">See your patients</p>
              <div className=""></div>
            </div>
            <div className="lg:pt-[80px] pt-5">
              <Slider2 className="" />
            </div>
          </div>
        </div>
      </div>

      <div className="sm:mt-[615px] md:mt-[615px] lg:mt-[25px] pl-[20px]">
        <Footer />
      </div>
    </div>
  );
};

export default PsyHome;
