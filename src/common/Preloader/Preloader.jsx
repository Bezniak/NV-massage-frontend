import React from 'react';
import s from './Preloader.module.css'


export const Preloader = () => {
    return (
        <div className={s.preloaderBlock}>
            <img src="/preloader.svg" alt="preloader"/>
        </div>
    );
};