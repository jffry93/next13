'use client';
import React, { ReactElement } from 'react';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
//swiper core and modules
import SwiperCore, {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
  Mousewheel,
} from 'swiper';

//install swiper modules
SwiperCore.use([Navigation, Pagination, A11y, Autoplay, Mousewheel]);

interface PropTypes {
  hasPagination?: boolean;
  slideArray: ReactElement[];
}

export const PopularCarousel = ({ slideArray, hasPagination }: PropTypes) => {
  const modules = [];

  if (hasPagination) {
    modules.push(Pagination);
  }
  return (
    <div
      className={`relative -mt-20 flex flex-col items-center w-screen overflow-hidden`}
    >
      <div className="w-full min-h-16">
        <Swiper
          mousewheel={{ forceToAxis: true, sensitivity: 0.5 }}
          pagination={{
            clickable: hasPagination,
            dynamicBullets: true,
            renderBullet: function (index, className) {
              return `<span class="${className}" style="background-color: #fff;"></span>`;
            },
          }}
          modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel]}
          autoplay={{
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            delay: 10000,
          }}
        >
          {slideArray.map((SlideComponent, index) => {
            return (
              <SwiperSlide className="relative h-full" key={index}>
                {SlideComponent}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
