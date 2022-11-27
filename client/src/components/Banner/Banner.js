import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./banner.css";
import { Navigation, Autoplay } from "swiper";

const slider = [
  { image: "https://cdn.tgdd.vn/2022/05/banner/720-220-720x220-255.png" },
  { image: "https://cdn.tgdd.vn/2022/06/banner/720-220-720x220-106.png" },
  {
    image: "https://cdn.tgdd.vn/2022/06/banner/tlvivo-720-220-720x220-2.png",
  },
  {
    image: "https://cdn.tgdd.vn/2022/06/banner/xk-aseri-720-220-720x220-1.png",
  },
  { image: "https://cdn.tgdd.vn/2022/06/banner/poco40-720-220-720x220-1.png" },
];

export default function Banner() {
  return (
    <div className="aspect-[720/220] mt-6 rounded-md overflow-hidden border-none">
      <Swiper
        loop={true}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
      >
        {slider.map((p) => (
          <SwiperSlide key={p.image}>
            <img src={p.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
