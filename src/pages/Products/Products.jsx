import React, {useEffect, useState} from 'react';
import s from './Products.module.css';
import useFetchAllData from "../../hooks/useFetchAllData";
import {NavLink} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import {HiMiniArrowLongRight} from "react-icons/hi2";
import useFetch from "../../hooks/useFetch";
import {animateScroll as scroll} from "react-scroll";

const Products = () => {
    const {data, loading, error} = useFetchAllData(`/products?populate=*`);
    const {data: massagesData, loading: massagesLoading, error: massagesError} = useFetch(`/massages-types?populate=*`);
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        if (massagesData?.attributes?.img?.data?.attributes?.url) {
            const img = new Image();
            img.onload = () => {
                setBackgroundLoaded(true);
            };
            img.src = process.env.REACT_APP_UPLOAD_URL + massagesData.attributes.img.data.attributes.url;
        }
    }, [massagesData]);

    const handleClick = () => {
        // Smooth scroll to top using react-scroll
        scroll.scrollToTop({
            duration: 0, // Animation duration in milliseconds
            smooth: 'easeInOutQuad', // Animation type
        });
    };


    return (
        <>
            {error ? <p className='getDataError'>Ошибка при загрузке данных</p>
                : loading ? <Preloader/>
                    : <>
                        {!backgroundLoaded && <Preloader/>}
                        <div className='welcomeBlock'
                             style={{backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + massagesData?.attributes?.img?.data?.attributes?.url})`}}>
                            <h1>{massagesData?.attributes?.title}</h1>
                        </div>

                        <div className={s.productsBlock}>
                            <div className={s.productsWrapper}>
                                {
                                    data?.map((item) => (
                                        <div key={item.id} className={s.productItem}>
                                            <img
                                                src={process.env.REACT_APP_UPLOAD_URL + item?.attributes?.mainImage?.data?.attributes?.url}
                                                alt={item?.attributes?.mainImage?.data?.attributes?.name}
                                            />
                                            <h2>{item?.attributes.title}</h2>
                                            <p>{item?.attributes?.description}</p>
                                            <NavLink to={`/product/${item.id}`} onClick={handleClick}>
                                                <button className={s.productsBtn}>
                                                    Узнать больше
                                                    <HiMiniArrowLongRight/>
                                                </button>
                                            </NavLink>
                                            <div className={s.productsDetails}>
                                                <p>Цена: {item?.attributes?.price} BYN</p>
                                                <p>{item?.attributes?.timeDuration}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    );
};

export default Products;
