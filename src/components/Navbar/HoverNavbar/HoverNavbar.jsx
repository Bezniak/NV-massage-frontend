import React from 'react';
import s from './HoverNavbar.module.css';
import {NavLink, useNavigate} from 'react-router-dom';
import {FaArrowRightLong} from "react-icons/fa6";
import {animateScroll as scroll} from "react-scroll";


const HoverNavbar = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    const handleItemClick = (path) => {
        navigate(`${path}`);
    };

    const items = props.items || [];

    return (
        <div>
            <ul className={s.hoverList}>
                {items.map((item, index) => (
                    <li className={s.listItem} key={index} onClick={() => handleItemClick(item.path)}>
                        <NavLink to={`${item.path}`} className={s.navLink} onClick={handleClick}>
                    <span className={s.linkText}>
                        <FaArrowRightLong className={s.arrowIcon}/>
                        {item.title}
                    </span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HoverNavbar;
