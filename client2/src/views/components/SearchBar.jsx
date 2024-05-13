import React from "react";

export default function SearchBar() {
  return (
    <div>
      <form action="" className="flex relative">
        <div className="w-full h-[45px] sm:w-full rounded-md">
          <input
            className="w-full h-full rounded-md text-black font-medium px-2"
            type="text"
            placeholder="Search"
          />
        </div>
        <div className="absolute right-2 text-white font-medium bg-[#0D1130] hover:bg-[#FF7E00] rounded-md py-1 px-2 mt-[7px]">
          <button className="hover:bg-[#FF7E00] hover:text-black border-none">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
