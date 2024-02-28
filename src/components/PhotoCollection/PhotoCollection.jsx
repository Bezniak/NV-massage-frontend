import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './PhotoCollection.css';

// import required modules
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import useFetch from '../../hooks/useFetch';
import { Preloader } from '../../common/Preloader/Preloader';

export default function PhotoCollection() {
    const { data, loading, error } = useFetch('/photo-collections?populate=*');

    return (
        <>
            {loading ? (
                <Preloader />
            ) : (
                <div className="photoCollection">
                    <h1>{data?.attributes?.title}</h1>
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        navigation={true}
                        pagination={{
                            clickable: true,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation]}
                        className="mySwiper2"
                    >
                        {data?.attributes?.img?.data?.map((p) => (
                            <SwiperSlide key={p.id}>
                                <img src={process.env.REACT_APP_UPLOAD_URL + p?.attributes?.url} alt={p.name} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}
