import React from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";
import BookButton from "../../common/BookButton/BookButton";
import {IoIosArrowDown} from "react-icons/io";

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <NavLink to='/'>
                <img src="/whiteLogo.png" alt="logo"/>
            </NavLink>
            <NavLink to='/'>
                Главная
            </NavLink>
            <NavLink to='/about'>
                Наш салон
                <IoIosArrowDown/>
            </NavLink>
            <NavLink to='/services'>
                Услуги
                <IoIosArrowDown/>
            </NavLink>
            <NavLink to='/specialties'>
                Специальные предложения
                <IoIosArrowDown/>
            </NavLink>

            <BookButton title='Записаться!'/>
        </div>
    );
};

export default Navbar;