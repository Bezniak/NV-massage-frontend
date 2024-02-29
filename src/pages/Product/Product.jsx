import React, {Fragment} from 'react';
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


    return (
        <>
            {error ? (
                <p>Что-то пошло не так!</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <>
                    <div
                        className={s.productWrapper}
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.bgImg?.data?.attributes?.url})`,
                        }}
                    >
                        <h1>{data?.attributes?.title}</h1>
                        <p>{data?.attributes?.description}</p>
                    </div>

                    <h1 className={s.photoTitle}>{data?.attributes?.productPhotoTitle}</h1>
                    <PhotoCollection data={data?.attributes?.productImages} loading={loading}
                                     error={error}
                    />

                    <div className={s.productBlock}>
                        <div className={s.productDescription}>
                            <h2>{data?.attributes?.productTitle1}</h2>
                            <ul className={s.descriptionList}>
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
                        </div>
                        <div className={s.productDescription}>
                            <h2>{data?.attributes?.productTitle2}</h2>
                            <ul className={s.descriptionList}>
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
                        </div>
                        <div className={s.productDescription}>
                            <h2>{data?.attributes?.productTitle3}</h2>
                            <ul className={s.descriptionList}>
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
                        </div>
                        <div className={`${s.productDescription} ${s.conclusion}`}>
                            <ul className={s.descriptionList}>
                                <li>{data?.attributes?.conclusion}</li>
                                <li>{data?.attributes?.bookTitle}</li>

                            </ul>
                            <BookButton title='ЗАПИСАТЬСЯ НА МАССАЖ ПРЯМО СЕЙЧАС!' color={'black'} scrolled={true}/>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Product;