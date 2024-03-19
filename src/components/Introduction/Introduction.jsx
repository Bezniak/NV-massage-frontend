import React from 'react';
import s from './Introduction.module.css';
import BookButton from "../../common/BookButton/BookButton";
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";

const Introduction = ({type}) => {
    const {data, loading, error} = useFetch(`/${type}?populate=*`);

    return (
        <>
            {error ? <p className='getDataError'>Произошла ошибка при загрузке данных</p>
                : loading ? (
                    <Preloader/>
                ) : (
                    <div className={s.introduction}>
                        <div className={s.introductionBlock}>
                            <img src='/logoBlack.png' alt="logo"/>
                            <h1>{data?.attributes?.title}</h1>
                            <p>{data?.attributes?.desc}</p>
                            <BookButton title='Записаться на массаж!' color={'black'}/>
                        </div>
                    </div>
                )}
        </>
    );
};

export default Introduction;