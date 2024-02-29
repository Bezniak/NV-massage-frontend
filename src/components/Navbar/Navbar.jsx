import React, { useEffect, useState } from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import BookButton from '../../common/BookButton/BookButton';
import { IoIosArrowDown } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import {animateScroll as scroll} from "react-scroll";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    const navbarClass = `${scrolled ? s.scrolled : s.navbar}`;

    return (
        <>
            {!scrolled && (
                <div className={navbarClass}>
                    <div className={s.logosBlock}>
                        <BsSearch />
                        <NavLink to="/" onClick={handleClick}>
                            <img src="/whiteLogo.png" alt="logo" />
                        </NavLink>
                        <BookButton title="Записаться!" />
                    </div>
                    <div className={s.headerBlock}>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>
                        <NavLink to="/about" onClick={handleClick}>
                            Наш салон
                            <IoIosArrowDown />
                        </NavLink>
                        <NavLink to="/products" onClick={handleClick}>
                            Услуги
                        </NavLink>
                        <NavLink to="/specialties" onClick={handleClick}>
                            Специальные предложения
                            <IoIosArrowDown />
                        </NavLink>
                    </div>
                </div>
            )}

            {scrolled && (
                <div className={navbarClass}>
                    <div className={s.headerBlock}>
                        <NavLink to="/" onClick={handleClick}>
                            <img src="/logo_brown_main.png" alt="logo" />
                        </NavLink>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>
                        <NavLink to="/about" onClick={handleClick}>
                            Наш салон
                            <IoIosArrowDown />
                        </NavLink>
                        <NavLink to="/products" onClick={handleClick}>
                            Услуги
                        </NavLink>
                        <NavLink to="/specialties" onClick={handleClick}>
                            Специальные предложения
                            <IoIosArrowDown />
                        </NavLink>
                        <BookButton title="Записаться!" scrolled={scrolled} />
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;