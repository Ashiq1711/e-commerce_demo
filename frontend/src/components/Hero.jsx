import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import { backendUrl } from "../../../admin/src/App";
const Hero = () => {
  const [banner, setBanner] = useState([]);
  const getBannerData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/banner/list");
      setBanner(response.data.listBanner[0].image);
      // console.log(banner);
      //  if (response.data.success) {

      //    console.log(response)
      //  }else{
      //   toast.error(response.data.message)
      //  }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getBannerData();
  }, []);
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* ************* Left Side*************** */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base uppercase">
              our bestsellers
            </p>
          </div>
          <h1 className="prata-regular text-4xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">Shop Now</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>
      {/* ************* Right Side*************** */}
      <Carousel
        showIndicators={false}
        thumbWidth={55}
        showStatus={false}
        autoPlay={true}
        infiniteLoop={true}
        showArrows={true}
        className="w-full sm:w-1/2 text-center z-[-1] sm:z-0"
      >
        {banner.map((src, index) => (
          <div key={index}>
            <img src={src} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Hero;
