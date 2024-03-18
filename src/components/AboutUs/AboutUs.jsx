import React, {useState, useEffect} from 'react';
import s from './AboutUs.module.css';
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import PhotoCollection from "../PhotoCollection/PhotoCollection";
import Form from "../Form/Form";
import {IoLocation} from "react-icons/io5";
import {LuPhone} from "react-icons/lu";
import {IoIosMail} from "react-icons/io";
import {FaSquareInstagram} from "react-icons/fa6";
import {FaTelegram, FaViber} from "react-icons/fa";
import {NavLink} from "react-router-dom";

export const AboutUs = () => {
    const {data, loading, error} = useFetch(`/abouts?populate=*`);
    const {data: contactData, loading: contactLoading, error: contactError} = useFetch('/contacts?populate=*');
    const [backgroundLoaded, setBackgroundLoaded] = useState(false);

    useEffect(() => {
        if (data?.attributes?.imgBG?.data?.attributes?.url) {
            const img = new Image();
            img.onload = () => {
                setBackgroundLoaded(true);
            };
            img.src = process.env.REACT_APP_UPLOAD_URL + data.attributes.imgBG.data.attributes.url;
        }
    }, [data]);

    const handleAddressClick = (event) => {
        event.preventDefault();
        const formattedAddress = encodeURIComponent(contactData?.attributes?.addressForMap);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <>
            {error ? <p className='getDataError'>Что-то пошло не так</p>
                : loading ? <Preloader/>
                    :
                    <>
                        {!backgroundLoaded && <Preloader/>}
                            <div
                                className='welcomeBlock'
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                                }}
                            >
                                <img src='/newLogoWhite.svg' alt="logo"/>
                                <h1>{data?.attributes?.title}</h1>
                            </div>

                            <div className={s.personBlock}>
                                <div className={s.person}>
                                    <h2>{data?.attributes?.employeeTitle}</h2>
                                    <div className={s.personWrapper}>
                                        <div className={s.personInfo}>
                                            <img
                                                src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.employeePhoto?.data?.attributes?.url}
                                                alt={data?.attributes?.employeeName}/>
                                            <div className={s.personDesc}>
                                                <h3>{data?.attributes?.employeeName}</h3>
                                                <p>{data?.attributes?.employeePosition}</p>
                                            </div>
                                        </div>
                                        <div className={s.textDesc}>
                                            <p>{data?.attributes?.textDesc}</p>
                                        </div>
                                    </div>

                                    <h2>{data?.attributes?.achievementTitle}</h2>
                                    <p>{data?.attributes?.achievementDesc}</p>
                                    <PhotoCollection data={data?.attributes?.achievementImages} error={error}
                                                     loading={loading}
                                    />


                                    <div className={s.aboutFormBlock}>
                                        <div className={s.contactFormBlock}>
                                            <h2>{data?.attributes?.contactFormTitle}</h2>
                                            <p>{data?.attributes?.contactFormDesc}</p>
                                            <ul className={s.contactAddress}>
                                                <li onClick={handleAddressClick}>
                                                    <IoLocation/>
                                                    <NavLink to="">{contactData?.attributes?.address}</NavLink>
                                                </li>
                                                <li>
                                                    <LuPhone/>
                                                    <NavLink
                                                        to={`tel:${contactData?.attributes?.phone}`}>{contactData?.attributes?.phone}</NavLink>
                                                </li>
                                                <li>
                                                    <IoIosMail/>
                                                    <NavLink
                                                        to={`mailto:${contactData?.attributes?.email}`}>{contactData?.attributes?.email}</NavLink>
                                                </li>
                                            </ul>
                                            <ul className={s.contactLink}>
                                                <li>
                                                    <a href={`${contactData?.attributes?.instagram}`}
                                                       rel="noreferrer"
                                                       target="_blank"
                                                    >
                                                        <FaSquareInstagram/>
                                                        Instagram
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href={`tg://resolve?domain=${contactData?.attributes?.telegram}`}
                                                        rel="noreferrer"
                                                        target="_blank"
                                                    >
                                                        <FaTelegram/>
                                                        Telegram
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href={`viber://chat?number=${contactData?.attributes?.viber}`}
                                                       rel="noreferrer"
                                                       target="_blank"
                                                    >
                                                        <FaViber/>
                                                        Viber
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                        <Form/>
                                    </div>
                                </div>
                            </div>
                    </>
            }
        </>
    );
};

export default AboutUs;
