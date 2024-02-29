import React from 'react';
import {NavLink} from "react-router-dom";

const Card = ({item}) => {

    return (
        <div className='card'>
            <div className="image">
                {item?.attributes.isNew && <span>New Season</span>}
                <img src={process.env.REACT_APP_UPLOAD_URL + item.attributes?.img?.data?.attributes?.url}
                     alt="img1"
                     className="mainImg"/>
            </div>
            <h2>{item?.attributes.title}</h2>
            <div className="prices">
                <h3>${item.oldPrice || item?.attributes.price + 20}</h3>
                <h3>${item?.attributes.price}</h3>
            </div>
            <NavLink to={`/product/${item.id}`}>
                <button>
                    Узанть больше
                </button>
            </NavLink>
        </div>
    );
};

export default Card;