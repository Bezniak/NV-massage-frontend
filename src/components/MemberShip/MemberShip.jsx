import React, {useState, useEffect} from 'react';
import s from './MemberShip.module.css';
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import BookButton from "../../common/BookButton/BookButton";

const MemberShip = () => {
    const {data, loading, error} = useFetch('/member-ships?populate=*');
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        if (data?.attributes?.imgBG?.data?.attributes?.url) {
            const img = new Image();
            img.src = process.env.REACT_APP_UPLOAD_URL + data.attributes.imgBG.data.attributes.url;
            img.onload = () => {
                setBackgroundLoaded(true);
            };
        }
    }, [data]);

    return (
        <>
            {error ? <p>Ошибка при получении данных</p>
                : loading ? <Preloader/>
                    : (
                        <>
                            {!backgroundLoaded ? (
                                <Preloader/>
                            ) : (
                                <div className='welcomeBlock'
                                     style={{
                                         backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                                     }}>
                                    <h1>{data?.attributes?.title}</h1>
                                    <p>{data?.attributes?.desc}</p>
                                </div>
                            )}

                            <div className={s.mainContentWrapper}>
                                <div className={s.mainContent}>
                                    <div className={s.certificateBlock}>
                                        <div className={s.certificateImg}>
                                            <img
                                                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.certificateImg?.data?.attributes?.url}
                                                alt=""/>
                                        </div>
                                        <div className={s.certificateDesc}>
                                            <h2>{data?.attributes?.certificateTitle}</h2>
                                            <p>{data?.attributes?.certificateDesc}</p>
                                        </div>
                                    </div>
                                    <div className={s.certificateBlock}>
                                        <div className={s.certificateDesc}>
                                            <h2>{data?.attributes?.subscriptionTitle}</h2>
                                            <p>{data?.attributes?.subscriptionDesc}</p>
                                        </div>
                                        <div className={s.certificateImg}>
                                            <img
                                                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.subscriptionImg?.data?.attributes?.url}
                                                alt=""/>
                                        </div>
                                    </div>
                                        <p>{data?.attributes?.conclusionTitle}</p>
                                        <BookButton title={'Забронировать'} color={'black'} scrolled={true}/>
                                </div>
                            </div>
                        </>
                    )
            }
        </>
    );
};

export default MemberShip;
