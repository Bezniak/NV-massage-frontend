import React from 'react';
import s from './BookButton.module.css';

const BookButton = ({title, color, backgroundColor, scrolled}) => {
    const buttonClassName = `${s.button} ${scrolled ? s.scrolled : ''}`;

    const buttonStyle = {
        color: color || undefined,
    };

    return (
        <button className={buttonClassName} style={buttonStyle}>
            {title}
        </button>
    );
};

export default BookButton;