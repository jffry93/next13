'use client';
import React, { ReactElement } from 'react';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
//swiper core and modules
import SwiperCore, {
  Navigation,
  FreeMode,
  A11y,
  Autoplay,
  Mousewheel,
} from 'swiper';

//install swiper modules
SwiperCore.use([Navigation, A11y, Autoplay, Mousewheel, FreeMode]);

const Freemode = () => {
  return (
    <div
      className={`relative flex flex-col items-center w-screen overflow-hidden`}
    >
      <div className="w-full border-2 min-h-[300px]">
        <Swiper
          slidesPerView={3}
          freeMode={true}
          mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
          modules={[Navigation, A11y, Autoplay, Mousewheel, FreeMode]}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Freemode;
