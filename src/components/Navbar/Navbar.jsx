import React, { useEffect, useState } from 'react';
import s from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import BookButton from '../../common/BookButton/BookButton';
import { IoIosArrowDown } from 'react-icons/io';
import { BsSearch } from 'react-icons/bs';
import {animateScroll as scroll} from "react-scroll";
import HoverNavbar from "./HoverNavbar/HoverNavbar";

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isBlockVisible, setIsBlockVisible] = useState(false);
    const [contentBlock, setContentBlock] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 0;
            setIsBlockVisible(false)
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const onContentBlockClick = () => {
        setIsBlockVisible(false)
    }

    const onMoseEnter = (blockInfo) => {
        setIsBlockVisible(true)
        setContentBlock(blockInfo)
    }

    const onMouseLeave = () => {
        setIsBlockVisible(false)
        setContentBlock('')
    }


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
                            <img src="/newLogoWhite.svg" alt="logo" className={s.logo}/>
                        </NavLink>
                        <BookButton title='Записаться!' color={'white'} />
                    </div>
                    <div className={s.headerBlock}>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>

                        <a  onClick={handleClick} onMouseEnter={() => onMoseEnter('about')}>
                            Мой кабинет
                            <IoIosArrowDown />
                        </a>

                        {isBlockVisible && contentBlock === 'about' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`} onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'Обо мне', path: '/aboutUs'},
                                        {title: 'Отзывы', path: '/reviews'},
                                        {title: 'Часто задаваемые вопросы', path: '/faq'},
                                        {title: 'Местоположение', path: '/location'},
                                    ]}
                                />
                            </div>
                        )}


                        <NavLink to="/products" onClick={handleClick}>
                            Услуги
                        </NavLink>


                        <a  onClick={handleClick} onMouseEnter={() => onMoseEnter('specialties')}>
                            Специальные предложения
                            <IoIosArrowDown />
                        </a>

                        {isBlockVisible && contentBlock === 'specialties' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`} onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'Сертификаты и абонементы', path: '/memberShip'},
                                        {title: 'Рассрочка', path: '/installment'},
                                    ]}
                                />
                            </div>
                        )}


                    </div>
                </div>
            )}

            {scrolled && (
                <div className={navbarClass}>
                    <div className={s.headerBlock}>
                        <NavLink to="/" onClick={handleClick} className={s.logoLink}>
                            <img src="/newLogoGray.svg" alt="logo" className={s.logoScroll}/>
                        </NavLink>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>


                        <a  onClick={handleClick} onMouseEnter={() => onMoseEnter('about')}>
                            Наш салон
                            <IoIosArrowDown />
                        </a>

                        {isBlockVisible && contentBlock === 'about' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`} onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'О нас', path: '/aboutUs'},
                                        {title: 'Отзывы', path: '/reviews'},
                                        {title: 'F.A.Q.', path: '/faq'},
                                        {title: 'Местоположение', path: '/location'},
                                    ]}
                                />
                            </div>
                        )}


                        <NavLink to="/products" onClick={handleClick}>
                            Услуги
                        </NavLink>
                        <a  onClick={handleClick} onMouseEnter={() => onMoseEnter('specialties')}>
                            Специальные предложения
                            <IoIosArrowDown />
                        </a>

                        {isBlockVisible && contentBlock === 'specialties' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`} onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'Сертификаты и абонементы', path: '/memberShip'},
                                    ]}
                                />
                            </div>
                        )}
                        <BookButton title='Записаться на массаж!' color={'black'} />
                    </div>
                </div>
            )}


        </>
    );
};

export default Navbar;