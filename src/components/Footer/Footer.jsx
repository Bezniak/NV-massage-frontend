import React from 'react';
import s from './Footer.module.css';
import useFetch from "../../hooks/useFetch";
import {NavLink} from "react-router-dom";
import {Preloader} from "../../common/Preloader/Preloader";
import {FaFacebook, FaSquareInstagram} from "react-icons/fa6";
import {FaLinkedin, FaTelegram, FaTiktok, FaViber} from "react-icons/fa";
import useFetchAllData from "../../hooks/useFetchAllData";
import {animateScroll as scroll} from "react-scroll";

const Footer = () => {
    const {data, loading, error} = useFetch('/contacts?populate=*');
    const {
        data: productsData,
        loading: productsLoading,
        error: productsError
    } = useFetchAllData(`/products?populate=*`);

    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    const currentYear = new Date().getFullYear()


    return (
        <div>
            {error ? <p>Произошла ошибка при загрузке данных.</p>
                : loading ? (
                    <Preloader/>
                ) : (
                    <div className={s.footer}>
                        <div className={s.footerWrapper}>

                            <div>
                                <div className={s.logoBlock}>
                                    <NavLink to='/' onClick={handleClick}>
                                        <img src='/whiteLogo.png' alt="logo"/>
                                    </NavLink>
                                    <NavLink to='/' onClick={handleClick}>
                                        {data?.attributes?.companyName}
                                    </NavLink>
                                </div>
                                <ul className={s.contactBlock}>
                                    <li>{data?.attributes?.address}</li>
                                    <li>
                                        Телефон: <a
                                        href={`tel:${data?.attributes?.phone}`}>{data?.attributes?.phone}</a>
                                    </li>
                                    <li>
                                        Email: <a
                                        href={`mailto:${data?.attributes?.email}`}>{data?.attributes?.email}</a>
                                    </li>
                                </ul>
                                <ul className={s.socialNetworkLinks}>
                                    <li>
                                        <a
                                            href={`${data?.attributes?.facebook}`}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <FaFacebook/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`${data?.attributes?.instagram}`}
                                           rel="noreferrer"
                                           target="_blank"
                                        >
                                            <FaSquareInstagram/>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`${data?.attributes?.linkedIn}`}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FaLinkedin/>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`${data?.attributes?.tikTok}`}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FaTiktok/>
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            href={`tg://resolve?domain=${data?.attributes?.telegram}`}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FaTelegram/>
                                        </a>
                                    </li>
                                    <li>
                                        <a href={`viber://chat?number=${data?.attributes?.viber}`}>
                                            <FaViber/>
                                        </a>
                                    </li>
                                </ul>
                            </div>


                            <ul className={s.massagesTypeList}>
                                <li className={s.footerTitle}>Виды массажа</li>
                                {productsData.map(massage => (
                                    <NavLink to={`/product/${massage.id}`} onClick={handleClick} key={massage.id}>
                                        {massage?.attributes?.title}
                                    </NavLink>
                                ))}
                            </ul>
                            <ul className={s.massagesTypeList}>
                                <li className={s.footerTitle}>Салон</li>
                                <NavLink to='/aboutUs' onClick={handleClick}>
                                    О нас
                                </NavLink>
                                <NavLink to='/reviews' onClick={handleClick}>
                                    Отзывы
                                </NavLink>
                                <NavLink to='/faq' onClick={handleClick}>
                                    Часто задаваемые вопросы
                                </NavLink>
                                <NavLink to='/memberShip' onClick={handleClick}>
                                    Сертификаты и абонементы
                                </NavLink>
                                <NavLink to='/location' onClick={handleClick}>
                                    Местоположение
                                </NavLink>
                            </ul>
                        </div>

                        <p className={s.copyRight}>
                            © {currentYear} {data?.attributes?.companyName}. Все права защищены. Developed by
                            <a href="https://www.linkedin.com/in/ivan-bezniak-2634a11a0/"
                               rel="noreferrer"
                               target="_blank"
                            > Ivan Bezniak</a>
                        </p>
                    </div>
                )}
        </div>
    );
};

export default Footer;