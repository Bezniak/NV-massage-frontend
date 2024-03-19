import React, {useCallback, useState, useEffect} from 'react';
import s from './Faq.module.css';
import useFetch from '../../hooks/useFetch';
import {Preloader} from '../../common/Preloader/Preloader';
import useFetchAllData from '../../hooks/useFetchAllData';
import {AiOutlineMinus, AiOutlinePlus} from 'react-icons/ai';

export const Faq = () => {
    const {data, loading, error} = useFetch('/faqs?populate=*');
    const {data: askData, loading: askLoading, error: askError} = useFetchAllData('/faq-ask-and-answers?populate=*');
    const [expandedIndexes, setExpandedIndexes] = useState([]);
    const [bgImageLoaded, setBgImageLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
            setBgImageLoaded(true);
        };
        img.src = process.env.REACT_APP_UPLOAD_URL + data?.attributes?.mainImageBG?.data?.attributes?.url;
    }, [data]);

    const handleVisible = useCallback((id) => {
        setExpandedIndexes((prevIndexes) => {
            if (prevIndexes.includes(id)) {
                return prevIndexes.filter((i) => i !== id);
            } else {
                return [...prevIndexes, id];
            }
        });
    }, []);

    return (
        <>
            {error ? <p>Ошибка при загрузке данных</p>
                : loading || !bgImageLoaded ? <Preloader/>
                    : (
                        <div>
                            <div
                                className='welcomeBlock'
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.mainImageBG?.data?.attributes?.url})`,
                                }}
                            >
                                <h1>{data?.attributes?.title}</h1>
                            </div>

                            <div className={s.faqBlock}>
                                <div className={s.faqContent}>
                                    <h2>{data?.attributes?.title2}</h2>
                                    <p>{data?.attributes?.desc2}</p>

                                    <div className={s.ask}>
                                        {askData.map((ask) => (
                                            <div
                                                className={`${s.askItem} ${
                                                    expandedIndexes.includes(ask.id) || askData.indexOf(ask) === 0 ? s.expanded : ''
                                                }`}
                                                key={ask.id}
                                                onClick={() => handleVisible(ask.id)}
                                            >
                                                <h3 className={askData.indexOf(ask) === 0 ? s.expanded : ''}>{ask?.attributes?.ask}</h3>
                                                <div
                                                    className={`${expandedIndexes.includes(ask.id) || askData.indexOf(ask) === 0 ? s.visible : s.hidden} ${s.answer}`}
                                                >
                                                    {ask?.attributes?.answer}
                                                </div>
                                                {expandedIndexes.includes(ask.id) || askData.indexOf(ask) === 0 ? (
                                                    <AiOutlineMinus className={s.minusIcon} onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleVisible(ask.id);
                                                    }}/>
                                                ) : (
                                                    <AiOutlinePlus className={s.plusIcon} onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleVisible(ask.id);
                                                    }}/>
                                                )}
                                            </div>
                                        ))}
                                    </div>



                                </div>
                            </div>
                        </div>
                    )
            }
        </>
    );
};
