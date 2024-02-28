import React from 'react';
import {useParams} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import useFetchAllData from "../../hooks/useFetchAllData";

const Product = () => {

    const id = useParams().id


    const {data, loading, error} = useFetchAllData(`/products/${id}?populate=*`);


    console.log(data)

    return (
        <div className='product'>
            {loading
                ? <Preloader/>
                : (
                    <>

                        <div className="right">
                            <h1>{data?.attributes?.title}</h1>
                            <span className='price'>${data?.attributes?.price}</span>
                            <p>{data?.attributes?.desc}</p>
                            <div className="quantity">

                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};


export default Product;