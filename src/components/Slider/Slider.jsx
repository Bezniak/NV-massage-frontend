import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import styles from './Slider.module.css'; // Import CSS Module
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import useFetch from '../../hooks/useFetch';
import {Preloader} from '../../common/Preloader/Preloader';

export default function Slider() {
    const {data, loading, error} = useFetch('/sliders?populate=*');

    return (
        <div className={styles['slider-container']}>
            {loading ? (
                <Preloader/>
            ) : (
                <>
                    <h1 className={styles['slider-title']}>{data?.attributes?.title}</h1>
                    <Swiper
                        spaceBetween={0}
                        centeredSlides={true}
                        loop={true}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={false}
                        modules={[Autoplay, Pagination, Navigation]}
                        effect="slide"
                        speed={3000}
                        className={styles.mySwiper}
                    >
                        {data?.attributes?.img?.data.map((photo) => (
                            <SwiperSlide key={photo.id}>
                                <div className={styles['slide-image']}>
                                    <img
                                        src={process.env.REACT_APP_UPLOAD_URL + photo?.attributes?.url}
                                        alt="photo"
                                        className={styles['slide-image-content']}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </div>
    );
}
