import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import './styles.css';

// import required modules
import { Navigation, Autoplay } from "swiper/modules";

const heroData = [
  {
    title: "E-Mental Health Services",
    description: "",
    image:
      "https://www.shutterstock.com/image-illustration/mental-health-care-sketch-diagram-260nw-626219957.jpg",
  },
  {
    title: "Chatbot System",
    description: " ",
    image:
      "https://www.nationalelfservice.net/cms/wp-content/uploads/2022/03/Screenshot-2022-03-21-at-20.17.09.png",
  },
  {
    title: "Blog Posts",
    description: " ",
    image:
      "https://blog.feedspot.com/wp-content/uploads/2017/02/Mental-Health-Blogs.jpg",
  },
  {
    title: "Video calling Psychologists",
    description: " ",
    image:
      "https://i.pcmag.com/imagery/roundups/01R08Wy1j10gGzd55OV1jbw-2.fit_lim.size_850x490.v1683901310.jpg",
  },
];

export default function Slider2() {
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Autoplay]}
        slidesPerView={1}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className="mySwiper lg:w-[400px] w-full"
      >
        {heroData.map((item, index) => (
          <SwiperSlide key={index} className="">
            <div className="">
              <img src={item.image} className="" alt="slider image" />
            </div>
            <div className="">
              <div className="">
                <h2 className="py-2">{item.title}</h2>
                <p className="text-justify">
                  {item.description.slice(0, 140)}{" "}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
