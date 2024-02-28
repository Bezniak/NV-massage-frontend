import React from 'react';
import s from './Products.module.css';
import useFetchAllData from "../../hooks/useFetchAllData";
import {NavLink, useParams} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import Card from "../../components/Cart/Cart";

const Products = () => {

    const {data, loading, error} = useFetchAllData(`/products?populate=*`);

    console.log(data)


    return (
        loading ? (
            <Preloader/>
        ) : (
            <div className={s.products}>
                <h1>Разнообразие эксклюзивных массажей в нашей студии</h1>
                <div className="bottom">
                    {error
                        ? "Что-то пошло не так!"
                        : loading
                            ? <Preloader/>
                            : data?.map((item) => (
                                <div key={item.id}>
                                    <img
                                        src={process.env.REACT_APP_UPLOAD_URL +
                                            item?.attributes?.mainImage?.data?.attributes?.url}
                                        alt=""/>
                                    <h2>{item?.attributes.title}</h2>
                                    <p>{item?.attributes?.description}</p>
                                    <NavLink to={`/product/${item.id}`}>
                                        <button>
                                            Узанть больше
                                        </button>
                                    </NavLink>
                                </div>
                            ))
                    }
                </div>
            </div>

        )
    );
};

export default Products;