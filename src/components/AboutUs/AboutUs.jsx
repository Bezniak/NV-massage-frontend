import React from 'react';
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

export const AboutUs = () => {
    const {data, loading, error} = useFetch(`/abouts?populate=*`);
    const {data: contactData, loading: contactLoading, error: contactError} = useFetch('/contacts?populate=*');

    console.log(contactData)


    return (
        <React.Fragment>
            {error ? (
                <p>Что-то пошло не так.</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <React.Fragment>
                    {!data?.attributes?.imgBG ? (
                        <Preloader/>
                    ) : (
                        <div
                            className={s.aboutUsWrapper}
                            style={{
                                backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                            }}
                        >
                            <img src='/whiteLogo.png' alt="logo"/>
                            <h1>{data?.attributes?.title}</h1>
                            <p>{data?.attributes?.desc}</p>
                        </div>
                    )}

                    <div className={s.person}>
                        <div className={s.personWrapper}>
                            <h1>{data?.attributes?.employeeTitle}</h1>
                            <div className={s.personInfo}>
                                <img
                                    src={process.env.REACT_APP_UPLOAD_URL + data?.attributes?.employeePhoto?.data?.attributes?.url}
                                    alt={data?.attributes?.employeeName}/>
                                <div className={s.personDesc}>
                                    <h2>{data?.attributes?.employeeName}</h2>
                                    <p>{data?.attributes?.employeePosition}</p>
                                </div>
                            </div>
                            <div className={s.textDesc}>
                                <p>{data?.attributes?.textDesc}</p>
                            </div>
                        </div>

                        <div className={s.achievement}>
                            <h2>{data?.attributes?.achievementTitle}</h2>
                            <p>{data?.attributes?.achievementDesc}</p>
                            <PhotoCollection data={data?.attributes?.achievementImages} error={error}
                                             loading={loading}/>
                        </div>
                        <div className={s.contactFormBlock}>
                            <div className={s.contactFormIntro}>
                                <h1>{data?.attributes?.contactFormTitle}</h1>
                                <p>{data?.attributes?.contactFormDesc}</p>
                                <div>
                                    {contactError ? (
                                        <p>Что-то пошло не так</p>
                                    ) : contactLoading ? (
                                        <Preloader/>
                                    ) : (
                                        <ul className={s.contactList}>
                                            <li>
                                                <IoLocation/>
                                                {contactData?.attributes?.address}
                                            </li>
                                            <li>
                                                <LuPhone/>
                                                <a href={`tel:${contactData?.attributes?.phone}`}>{contactData?.attributes?.phone}</a>
                                            </li>
                                            <li>
                                                <IoIosMail/>
                                                <a href={`mailto:${contactData?.attributes?.email}`}>{contactData?.attributes?.email}</a>
                                            </li>
                                        </ul>
                                    )}
                                </div>
                                <div>
                                    <ul className={s.socialNetworkLinks}>
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
                            </div>
                            <Form/>
                        </div>

                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};