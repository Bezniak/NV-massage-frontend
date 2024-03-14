import React from 'react';
import {NavLink} from 'react-router-dom'; // Импортируем NavLink из React Router
import s from './BookButton.module.css';
import {animateScroll as scroll} from "react-scroll";

const BookButton = ({title, color, backgroundColor, scrolled}) => {
    const buttonClassName = `${s.button} ${scrolled ? s.scrolled : ''}`;

    const buttonStyle = {
        color: color || undefined,
    };

    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    return (
        <NavLink to="/book" className={buttonClassName} style={buttonStyle} onClick={handleClick}>
            {title}
        </NavLink>
    );
};

export default BookButton;
