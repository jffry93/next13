'use client';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
//swiper core and modules
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';

//install swiper modules
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const MovieCarousel = ({
  arrayData,
  reverseDirection = false,
}: {
  arrayData: number[];
  reverseDirection: boolean;
}) => {
  return (
    <div className={`flex flex-col items-center w-screen overflow-hidden`}>
      <div className="w-full">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          className="swiper-js-container"
          loop={true}
          freeMode={true}
          touchRatio={1}
          slidesPerView={3}
          grabCursor={true}
          spaceBetween={30}
          autoplay={{
            disableOnInteraction: false,
            reverseDirection,
            pauseOnMouseEnter: true,
            delay: 0,
          }}
          speed={2000}
          breakpoints={{
            700: {
              pagination: {
                clickable: true,
                type: 'bullets',
              },
            },
          }}
        >
          {arrayData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  src={'https://source.unsplash.com/random/' + index}
                  alt="Random Image"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default MovieCarousel;
