import React from 'react';
import s from './NotFound.module.css'

const NotFound = () => {
    return (
        <div className={s.notFoundWrapper}>
            <div className={s.notFoundBlock}>
                <h1>404</h1>
                <p>Страница не найдена</p>
            </div>
        </div>
    );
};

export default NotFound;