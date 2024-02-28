import React, { useEffect, useState } from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import BookButton from '../../common/BookButton/BookButton';
import { IoIosArrowDown } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';

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

    const navbarClass = `${scrolled ? s.scrolled : s.navbar}`;

    return (
        <>
            {!scrolled && (
                <div className={navbarClass}>
                    <div className={s.logosBlock}>
                        <BsSearch />
                        <NavLink to="/">
                            <img src="/whiteLogo.png" alt="logo" />
                        </NavLink>
                        <BookButton title="Записаться!" />
                    </div>
                    <div className={s.headerBlock}>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/about">
                            Наш салон
                            <IoIosArrowDown />
                        </NavLink>
                        <NavLink to="/products">
                            Услуги
                        </NavLink>
                        <NavLink to="/specialties">
                            Специальные предложения
                            <IoIosArrowDown />
                        </NavLink>
                    </div>
                </div>
            )}

            {scrolled && (
                <div className={navbarClass}>
                    <div className={s.headerBlock}>
                        <NavLink to="/">
                            <img src="/logo_brown_main.png" alt="logo" />
                        </NavLink>
                        <NavLink to="/">Главная</NavLink>
                        <NavLink to="/about">
                            Наш салон
                            <IoIosArrowDown />
                        </NavLink>
                        <NavLink to="/products">
                            Услуги
                        </NavLink>
                        <NavLink to="/specialties">
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