import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";
import i1 from "../assets/i1.avif";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.webp";
import i4 from "../assets/i4.jpg";
import i5 from "../assets/i5.jpg";
import i6 from "../assets/i6.png";
import i7 from "../assets/i7.png";
import i8 from "../assets/i8.png";
import i9 from "../assets/i9.png";
import i10 from "../assets/i10.jpg";
import img from "../assets/6596121.png";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>
            <span className="shopland">shopland </span>
            The God <br />
            Of Shops.
          </h1>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            mousewheel={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <img src={i9} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i2} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i3} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i4} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i5} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i6} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i7} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i8} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i1} />
            </SwiperSlide>
            <SwiperSlide>
              <img src={i10} />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Home;
