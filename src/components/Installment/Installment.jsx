import React, {Fragment, useEffect, useState} from 'react';
import s from './Installment.module.css';
import {Preloader} from '../../common/Preloader/Preloader';
import useFetch from "../../hooks/useFetch";

const Product = () => {
    const {data, loading, error} = useFetch(`/installments?populate=*`);
    const [imageLoaded, setImageLoaded] = useState(false);

    console.log(data)

    useEffect(() => {
        if (data && data.attributes && data.attributes.imgBG && data.attributes.imgBG.data.attributes.url) {
            const image = new Image();
            image.onload = () => {
                setImageLoaded(true);
            };
            image.src = process.env.REACT_APP_UPLOAD_URL + data.attributes.imgBG.data.attributes.url;
        }
    }, [data]);

    return (
        <>
            {error ? (
                <p>Что-то пошло не так!</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <>
                    {imageLoaded ? (
                        <div
                            className='welcomeBlock'
                            style={{
                                backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                            }}
                        >
                            <h1>{data?.attributes?.title}</h1>
                            <p>{data?.attributes?.desc}</p>
                        </div>
                    ) : (
                        <Preloader/>
                    )}
                </>
            )}
        </>
    );
};

export default Product;