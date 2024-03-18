import React, {Fragment, useState, useEffect} from 'react';
import s from './Product.module.css';
import {useParams} from 'react-router-dom';
import {Preloader} from '../../common/Preloader/Preloader';
import useFetchAllData from '../../hooks/useFetchAllData';
import PhotoCollection from '../../components/PhotoCollection/PhotoCollection';
import {GiCheckMark} from 'react-icons/gi';
import BookButton from "../../common/BookButton/BookButton";

const Product = () => {
    const id = useParams().id;
    const {data, loading, error} = useFetchAllData(`/products/${id}?populate=*`);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        if (data && data.attributes && data.attributes.bgImg && data.attributes.bgImg.data.attributes.url) {
            const image = new Image();
            image.onload = () => {
                setImageLoaded(true);
            };
            image.src = process.env.REACT_APP_UPLOAD_URL + data.attributes.bgImg.data.attributes.url;
        }
    }, [data]);

    return (
        <>
            {error ? (
                <p className='getDataError'>Что-то пошло не так!</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <>
                    {imageLoaded ? (
                        <div
                            className='welcomeBlock'
                            style={{
                                backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.bgImg?.data?.attributes?.url})`,
                            }}
                        >
                            <h1>{data?.attributes?.title}</h1>
                            <p>{data?.attributes?.description}</p>
                        </div>
                    ) : (
                        <Preloader/>
                    )}

                    <div className={s.productWrapper}>
                        <div className={s.productBlock}>
                            <h2>{data?.attributes?.productPhotoTitle}</h2>
                            <PhotoCollection data={data?.attributes?.productImages} loading={loading} error={error}/>
                            <h2>{data?.attributes?.productTitle1}</h2>
                            <ul>
                                {data?.attributes?.productDesc1.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item?.children.map((i, index) => (
                                            <li key={index}>
                                                <GiCheckMark/>
                                                {i?.text}
                                            </li>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </ul>
                            <h2>{data?.attributes?.productTitle2}</h2>
                            <ul>
                                {data?.attributes?.productDesc2.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item?.children.map((i, index) => (
                                            <li key={index}>
                                                <GiCheckMark/>
                                                {i?.text}
                                            </li>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </ul>
                            <h2>{data?.attributes?.productTitle3}</h2>
                            <ul>
                                {data?.attributes?.productDesc3.map((item, index) => (
                                    <React.Fragment key={index}>
                                        {item?.children.map((i, index) => (
                                            <li key={index}>
                                                <GiCheckMark/>
                                                {i?.text}
                                            </li>
                                        ))}
                                    </React.Fragment>
                                ))}
                            </ul>
                            <ul>
                                <li>{data?.attributes?.conclusion}</li>
                                <li>{data?.attributes?.bookTitle}</li>
                            </ul>
                            <BookButton title='ЗАПИСАТЬСЯ!' color={'black'}/>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Product;