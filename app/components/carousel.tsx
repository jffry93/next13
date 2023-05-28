'use client';
//swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
//swiper core and modules
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper';

//install swiper modules
SwiperCore.use([Navigation, Pagination, A11y, Autoplay]);

const arrayData = [1, 2, 3, 4, 5, 6];

const MovieCarousel = () => {
  return (
    <div
      className={`flex flex-col items-center w-screen h-screen min-h-full overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black`}
    >
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
            delay: 0,
            disableOnInteraction: false,
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
