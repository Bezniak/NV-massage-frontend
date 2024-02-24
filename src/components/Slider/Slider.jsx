import React, { useState } from 'react';
import s from './Slider.module.css';
import useFetch from "../../hooks/useFetch";
import { Preloader } from "../../common/Preloader/Preloader";
import { FaRegCircle } from "react-icons/fa";

const Slider = () => {
    const { data, loading, error } = useFetch('/sliders?populate=*');
    const [selectedImg, setSelectedImg] = useState(0);

    console.log(data);

    return (
        <div className={s.slider}>
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <div className={s.container}>
                        <h1>{data?.attributes?.title}</h1>
                        <div className={s.images}>
                            <div className={`${s.imageWrapper} ${s.overlay}`}>
                                <img
                                    src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.[selectedImg]?.attributes?.url}
                                    alt="Image 1"
                                />
                            </div>
                            <div className={`${s.imageWrapper} ${s.overlay}`}>
                                <img
                                    src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.[selectedImg]?.attributes?.url}
                                    alt="Image 2"
                                />
                            </div>
                            <div className={`${s.imageWrapper} ${s.overlay}`}>
                                <img
                                    src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.img?.data?.[selectedImg]?.attributes?.url}
                                    alt="Image 3"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={s.icons}>
                        <div className={s.icon} onClick={() => setSelectedImg(0)}>
                            <FaRegCircle />
                        </div>
                        <div className={s.icon} onClick={() => setSelectedImg(1)}>
                            <FaRegCircle />
                        </div>
                        <div className={s.icon} onClick={() => setSelectedImg(2)}>
                            <FaRegCircle />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Slider;