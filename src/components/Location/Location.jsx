import React, {useEffect, useState} from 'react';
import s from './Location.module.css';
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import Map from "./Map";
import {FaFacebook, FaSquareInstagram} from "react-icons/fa6";
import {FaLinkedin, FaTelegram, FaTiktok, FaViber} from "react-icons/fa";


const Location = () => {
    const {data, loading, error} = useFetch('/contacts?populate=*');
    const [bgLoaded, setBgLoaded] = useState(false);

    useEffect(() => {
        if (data?.attributes?.locationBG?.data?.attributes?.url) {
            const img = new Image();
            img.src = process.env.REACT_APP_UPLOAD_URL + data.attributes.locationBG.data.attributes.url;
            img.onload = () => {
                setBgLoaded(true);
            };
        }
    }, [data]);

    const handleAddressClick = (event) => {
        event.preventDefault();
        const formattedAddress = encodeURIComponent(data?.attributes?.addressForMap);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div>
            {error ? <p>Что-то пошло не так</p>
                : loading || !bgLoaded ? <Preloader/>
                    : (
                        <>
                            <div
                                className='welcomeBlock'
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.locationBG?.data?.attributes?.url})`,
                                }}
                            >
                                <h1>{data?.attributes?.locationTitle}</h1>
                            </div>
                            <div className={s.contact}>
                                <div className={s.contactWrapper}>
                                    <h2>Местоположение</h2>
                                    <ul className={s.contactBlock}>
                                        <li onClick={handleAddressClick}>
                                            <a href="">{data?.attributes?.address}</a>
                                        </li>
                                        <li>
                                            Телефон: <a
                                            href={`tel:${data?.attributes?.phone}`}>{data?.attributes?.phone}</a>
                                        </li>
                                        <li>
                                            Email: <a
                                            href={`mailto:${data?.attributes?.email}`}>{data?.attributes?.email}</a>
                                        </li>
                                    </ul>
                                    <h2>Присоединяйтесь к нам в соцсетях</h2>
                                    <ul className={s.socialNetwork}>
                                        <li>
                                            <a
                                                href={`${data?.attributes?.facebook}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <FaFacebook/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`${data?.attributes?.instagram}`}
                                               rel="noreferrer"
                                               target="_blank"
                                            >
                                                <FaSquareInstagram/>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`${data?.attributes?.linkedIn}`}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                <FaLinkedin/>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`${data?.attributes?.tikTok}`}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                <FaTiktok/>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href={`tg://resolve?domain=${data?.attributes?.telegram}`}
                                                rel="noreferrer"
                                                target="_blank"
                                            >
                                                <FaTelegram/>
                                            </a>
                                        </li>
                                        <li>
                                            <a href={`viber://chat?number=${data?.attributes?.viber}`}>
                                                <FaViber/>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                                <div className={s.hours}>
                                    <h2>Часы работы</h2>
                                    <ul className={s.workingHours}>
                                        <li>Понедельник
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTime.substring(0, 5)} - {data?.attributes?.closeTime.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Вторник
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTime.substring(0, 5)} - {data?.attributes?.closeTime.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Среда
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTime.substring(0, 5)} - {data?.attributes?.closeTime.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Четверг
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTime.substring(0, 5)} - {data?.attributes?.closeTime.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Пятница
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTime.substring(0, 5)} - {data?.attributes?.closeTime.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Суббота
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTimeOnSaturday.substring(0, 5)} - {data?.attributes?.closeTimeOnSaturday.substring(0, 5)}
                                            </span>
                                        </li>
                                        <li>Воскресенье
                                            <span className={s.timeSpan}>
                                                {data?.attributes?.openTimeOnSunday.substring(0, 5)} - {data?.attributes?.closeTimeOnSunday.substring(0, 5)}
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <Map/>

                        </>
                    )
            }
        </div>
    );
};

export default Location;
