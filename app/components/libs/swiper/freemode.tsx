'use client';
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
import { ReactElement } from 'react';

//install swiper modules
SwiperCore.use([Navigation, Pagination, A11y, Autoplay, Mousewheel]);

const Freemode = ({ slideArray }: { slideArray: ReactElement[] }) => {
  return (
    <div
      className={`flex flex-col items-center w-screen overflow-hidden min-h-[300px]`}
    >
      <div className="w-full h-full">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay, Mousewheel]}
          mousewheel={{ forceToAxis: true, sensitivity: 1 }}
          freeMode={true}
          touchRatio={1}
          slidesPerView={1.5}
          grabCursor={true}
          spaceBetween={8}
          breakpoints={{
            450: {
              slidesPerView: 2.5,
            },
            730: {
              slidesPerView: 3.5,
            },
            1210: {
              slidesPerView: 5.5,
            },
            1590: {
              slidesPerView: 6.5,
            },
          }}
        >
          {slideArray.map((SlideComponent, index) => {
            // infinite scroll
            if (index + 1 === slideArray.length) {
              return (
                <SwiperSlide
                  className={`relative h-full ${index === 0 ? 'ml-4' : ''}`}
                  key={index}
                >
                  {SlideComponent}
                </SwiperSlide>
              );
            }
            return (
              <SwiperSlide
                className={`relative h-full ${index === 0 ? 'ml-4' : ''}`}
                key={index}
              >
                {SlideComponent}
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Freemode;
