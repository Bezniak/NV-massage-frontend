import React, {useEffect, useRef, useState} from 'react';
import s from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import BookButton from '../../common/BookButton/BookButton';
import {IoIosArrowDown} from 'react-icons/io';
import {animateScroll as scroll} from "react-scroll";
import HoverNavbar from "./HoverNavbar/HoverNavbar";
import {CgMenuLeft} from "react-icons/cg";
import {IoCloseOutline, IoLocationOutline} from "react-icons/io5";
import useFetch from "../../hooks/useFetch";


const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isBlockVisible, setIsBlockVisible] = useState(false);
    const [contentBlock, setContentBlock] = useState('');
    const [isMenuClicked, setIsMenuClicked] = useState(false);
    const {data, loading, error} = useFetch('/contacts?populate=*');
    const touchStartXRef = useRef(0);
    const touchMoveXRef = useRef(0);

    const handleAddressClick = () => {
        const formattedAddress = encodeURIComponent(data?.attributes?.addressForMap);
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`;
        window.open(googleMapsUrl, '_blank');
    };

    const handleMobileMenuClick = () => {
        setIsMenuClicked(prev => !prev);
        if (!isMenuClicked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    const handleTouchStart = (event) => {
        touchStartXRef.current = event.touches[0].clientX;
    };

    const handleTouchMove = (event) => {
        touchMoveXRef.current = event.touches[0].clientX;
        const touchDistance = touchStartXRef.current - touchMoveXRef.current;

        if (touchDistance > 100) {
            setIsMenuClicked(false);
        }
    };

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
                        <div><IoLocationOutline onClick={handleAddressClick}/></div>
                        <div>
                            <NavLink to="/" onClick={handleClick}>
                                <img src="/logoWhite.svg" alt="logo" className={s.logo}/>
                            </NavLink></div>
                        <div><BookButton title='Записаться!' color={'white'}/></div>
                    </div>
                    <div className={s.headerBlock}>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>
                        <a onClick={handleClick} onMouseEnter={() => onMoseEnter('about')}>
                            Мой кабинет
                            <IoIosArrowDown/>
                        </a>
                        {isBlockVisible && contentBlock === 'about' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`}
                                 onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
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
                        <a onClick={handleClick} onMouseEnter={() => onMoseEnter('specialties')}>
                            Специальные предложения
                            <IoIosArrowDown/>
                        </a>
                        {isBlockVisible && contentBlock === 'specialties' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`}
                                 onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'Сертификаты и абонементы', path: '/memberShip'},
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
                            <img src="/logoBlack.png" alt="logo" className={s.logoScroll}/>
                        </NavLink>
                        <NavLink to="/" onClick={handleClick}>Главная</NavLink>
                        <a onClick={handleClick} onMouseEnter={() => onMoseEnter('about')}>
                            Наш салон
                            <IoIosArrowDown/>
                        </a>
                        {isBlockVisible && contentBlock === 'about' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`}
                                 onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'О нас', path: '/aboutUs'},
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
                        <a onClick={handleClick} onMouseEnter={() => onMoseEnter('specialties')}>
                            Специальные предложения
                            <IoIosArrowDown/>
                        </a>
                        {isBlockVisible && contentBlock === 'specialties' && (
                            <div className={`${s.hoverWrapper} ${isBlockVisible ? 'visible' : ''}`}
                                 onMouseLeave={onMouseLeave} onClick={onContentBlockClick}>
                                <HoverNavbar
                                    items={[
                                        {title: 'Сертификаты и абонементы', path: '/memberShip'},
                                    ]}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}


            <div className={s.mobileMenu}>
                <div className={s.hamburgerMenu}>
                    <CgMenuLeft onClick={handleMobileMenuClick}/>
                    <NavLink to="/" onClick={handleClick}>
                        <img src="/logoWhite.svg" alt="logo" className={s.logo}/>
                    </NavLink>
                    <IoLocationOutline onClick={handleAddressClick}/>
                </div>
                <div className={`${s.hamburgerMenuList} ${isMenuClicked ? s.open : ""}`} onTouchStart={handleTouchStart}
                     onTouchMove={handleTouchMove}>
                    <div className={s.menuBlock}>
                        <h1>Меню</h1>
                        <IoCloseOutline onClick={handleMobileMenuClick}/>
                    </div>
                    <hr/>
                    <NavLink to="/" onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Главная
                    </NavLink>
                    <NavLink to='/aboutUs' onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Обо мне
                    </NavLink>
                    <NavLink to='/reviews' onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Отзывы
                    </NavLink>
                    <NavLink to='/faq' onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Часто задаваемые вопросы
                    </NavLink>
                    <NavLink to='/location' onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Местоположение
                    </NavLink>
                    <NavLink to="/products" onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Услуги
                    </NavLink>
                    <NavLink to='/memberShip' onClick={() => {
                        handleClick();
                        handleMobileMenuClick();
                    }}>
                        Сертификаты и абонементы
                    </NavLink>
                    <div className={s.centeredContainer}>
                        <BookButton title='Записаться!' onClick={handleMobileMenuClick} color='black' size='1rem'/>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Navbar;