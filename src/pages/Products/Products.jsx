import React from 'react';
import s from './Products.module.css';
import useFetchAllData from "../../hooks/useFetchAllData";
import {NavLink, useParams} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import Card from "../../components/Cart/Cart";
import {HiMiniArrowLongRight} from "react-icons/hi2";

const Products = () => {

    const {data, loading, error} = useFetchAllData(`/products?populate=*`);

    console.log(data)


    return (
        loading ? (
            <Preloader/>
        ) : (
            <>
                <div className={s.products}>
                    <h1>Разнообразие эксклюзивных массажей в нашей студии</h1>
                </div>
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
                                    <NavLink to={`/product/${item.id}`}>
                                        <button className={s.productsBtn}>
                                            Узнать больше
                                            <HiMiniArrowLongRight />
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