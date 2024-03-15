import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './PhotoCollection.css';
import {Preloader} from '../../common/Preloader/Preloader';
import {EffectCoverflow, Navigation, Pagination} from "swiper/modules";

export default function PhotoCollection({data, loading, error, title}) {

    return (
        <>
            {error ? (
                <p>Что-то пошло не так!</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <div className="photoCollection">
                    <h1>{title}</h1>
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
                        {data?.data.map((p) => (
                            <SwiperSlide key={p.id}>
                                <img
                                    src={process.env.REACT_APP_UPLOAD_URL + p?.attributes?.url}
                                    alt={p.name}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </>
    );
}