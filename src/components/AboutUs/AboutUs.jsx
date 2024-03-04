import React from 'react';
import s from './AboutUs.module.css';
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import PhotoCollection from "../PhotoCollection/PhotoCollection";
import Form from "../Form/Form";

export const AboutUs = () => {
    const {data, loading, error} = useFetch(`/abouts?populate=*`);

    return (
        <React.Fragment>
            {error ? (
                <p>Что-то пошло не так.</p>
            ) : loading ? (
                <Preloader/>
            ) : (
                <React.Fragment>
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
                            <PhotoCollection data={data?.attributes?.achievementImages} error={error} loading={loading}/>
                        </div>
                        <Form/>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};