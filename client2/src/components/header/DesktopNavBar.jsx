/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import DropDown from "./Dropdown";
import logo from "../../assets/images/logos/mental-health.png";

export default function DesktopNavbar({ menuOptions }) {
  return (
    <>
      <div className="bg-[#F4F4F4 ]">
        <div className="flex justify-between py-1 mx-20">
          <div className="border h-[70px] w-[70px] rounded-full overflow-hidden">
            <Link to="/">
              <img src={logo} alt="web_logo" className="w-full h-full" />
            </Link>
          </div>

          <div className="flex justify-center items-center">
            <ul className="none lg:flex gap-8 m-0">
              {menuOptions.map((item) => (
                <DropDown key={item.title} item={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
