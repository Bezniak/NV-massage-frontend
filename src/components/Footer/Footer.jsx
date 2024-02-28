import React, {FC} from 'react';
import s from './Footer.module.css';
import {FaFacebook, FaSquareInstagram} from "react-icons/fa6";
import {FaLinkedin, FaTiktok} from "react-icons/fa";
import {NavLink} from "react-router-dom";
import {animateScroll as scroll} from "react-scroll/modules";
import useFetch from "../../hooks/useFetch";


export const Footer = () => {

    const {data, loading, error} = useFetch('/contacts?populate=*');


    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };


    const currentYear = new Date().getFullYear()

    return (
        <div className={s.footerWrapper}>
            <div className={s.footerBlock}>
                <div className={s.footerLogoInfo}>
                    <div className={s.logoWrapper}>
                        <div className={s.logoBlock}>
                            <NavLink onClick={handleClick} to='/'>
                                <img src="/whiteLogo.png" alt="logo" className={s.logo}/>
                            </NavLink>
                            <NavLink onClick={handleClick} to='/'>
                                <h2>{data?.attributes?.companyName}</h2>
                            </NavLink>
                        </div>
                        <div className={s.logoContacts}>
                            <p>{data?.attributes?.address}</p>
                            <p>Телефон:
                                <a href={`${data?.attributes?.phone}`}
                                   className={s.footerLink}
                                >
                                    {data?.attributes?.phone}
                                </a>
                            </p>
                            <p>Email:
                                <a href={`mailto:${data?.attributes?.email}`}
                                   className={s.footerLink}
                                >
                                    {data?.attributes?.email}
                                </a>
                            </p>
                        </div>

                        <div>
                            <ul className={s.linksBlock}>
                                <li>
                                    <a
                                        href={`${data?.attributes?.facebook}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={s.footerLink}
                                    >
                                        <FaFacebook className={s.linkSVG}/>
                                    </a>
                                </li>
                                <li><a href={`${data?.attributes?.instagram}`}
                                       rel="noreferrer"
                                       target="_blank"
                                       className={s.footerLink}
                                >
                                    <FaSquareInstagram className={s.linkSVG}/>
                                </a>
                                </li>
                                <li><a
                                    href={`${data?.attributes?.linkedIn}`}
                                    rel="noreferrer"
                                    target="_blank"
                                    className={s.footerLink}
                                >
                                    <FaLinkedin className={s.linkSVG}/>
                                </a>
                                </li>
                                <li><a
                                    href={`${data?.attributes?.tikTok}`}
                                    rel="noreferrer"
                                    target="_blank"
                                    className={s.footerLink}
                                >
                                    <FaTiktok className={s.linkSVG}/>
                                </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>


                <div className={s.footerInfoWrapper}>
                    <ul className={s.footerInfoBlock}>
                        <li className={s.footerInfoTitle}>Виды оказываемого массажа</li>
                        <li>
                            <NavLink to='/massage-description/classicBodyMassage' onClick={handleClick}>Классический
                                массаж тела</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/backMassage' onClick={handleClick}>Массаж спины</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/cervicalCollarArea' onClick={handleClick}>Массаж
                                шейно-воротниковой зоны</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/footMassage' onClick={handleClick}>Массаж ног</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/handMassage' onClick={handleClick}>Массаж рук</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/honeyMassage' onClick={handleClick}>Медовый
                                массаж</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/cuppingMassage' onClick={handleClick}>Баночный
                                массаж</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/faceMassage' onClick={handleClick}>Массаж лица</NavLink>
                        </li>
                        <li>
                            <NavLink to='/massage-description/relaxingMassage' onClick={handleClick}>Расслабляющий
                                массаж</NavLink>
                        </li>
                    </ul>


                    <ul className={s.footerInfoBlock}>
                        <li className={s.footerInfoTitle}>Наш салон</li>
                        <li>
                            <NavLink to='/aboutUs'>О нас</NavLink>
                        </li>
                        <li>
                            <NavLink to='/experts'>Эксперты</NavLink>
                        </li>
                        <li>
                            <NavLink to='/pricing'>Цены</NavLink>
                        </li>
                    </ul>


                    <ul className={s.footerInfoBlock}>
                        <li className={s.footerInfoTitle}>Контакты</li>
                        <li>
                            <NavLink to='/location'>Местоположение</NavLink>
                        </li>
                        <li>
                            <NavLink to='/helpAndFAQ'>Помощь и часто задаваемые вопросы</NavLink>
                        </li>
                        <li>
                            <NavLink to='/membership'>Сертификаты и абонементы</NavLink>
                        </li>
                        <li>
                            <NavLink to='/reviews'>Отзывы</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
            <p className={s.copyRight}>
                © {currentYear} Art-Massage. Все права защищены.
                Developed by <a href="https://www.linkedin.com/in/ivan-bezniak-2634a11a0/"
                                style={{color: "#43484E"}}>Ivan
                Bezniak</a>
            </p>
        </div>
    );
};
