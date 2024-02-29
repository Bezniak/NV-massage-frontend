import React from 'react';
import s from './Products.module.css';
import useFetchAllData from "../../hooks/useFetchAllData";
import {NavLink, useParams} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import Card from "../../components/Cart/Cart";
import {HiMiniArrowLongRight} from "react-icons/hi2";
import useFetch from "../../hooks/useFetch";
import {animateScroll as scroll} from "react-scroll";

const Products = () => {

    const {data, loading, error} = useFetchAllData(`/products?populate=*`);
    const {
        data: massagesData,
        loading: massagesLoading,
        error: massagesError
    } = useFetch(`/massages-types?populate=*`);


    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };


    return (
        loading ? (
            <Preloader/>
        ) : (
            <>
                {massagesLoading
                    ? <Preloader/>
                    : (
                        <div className={s.products}
                             style={{backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + massagesData?.attributes?.img?.data?.attributes?.url})`}}>
                            <h1>{massagesData?.attributes?.title}</h1>
                        </div>
                    )
                }
                <div className={s.productsBlock}>
                    {error
                        ? "Что-то пошло не так!"
                        : loading
                            ? <Preloader/>
                            : data?.map((item) => (
                                <div key={item.id} className={s.productItem}>
                                    <img
                                        src={process.env.REACT_APP_UPLOAD_URL +
                                            item?.attributes?.mainImage?.data?.attributes?.url}
                                        alt=""/>
                                    <h1>{item?.attributes.title}</h1>
                                    <p className={s.productsDescription}>{item?.attributes?.description}</p>
                                    <NavLink to={`/product/${item.id}`} onClick={handleClick}>
                                        <button className={s.productsBtn}>
                                            Узнать больше
                                            <HiMiniArrowLongRight/>
                                        </button>
                                    </NavLink>
                                    <p className={s.productsPrice}>Цена: {item?.attributes?.price} BYN</p>
                                </div>
                            ))
                    }
                </div>
            </>
        )
    );
};

export default Products;