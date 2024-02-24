import React from 'react';
import s from './Home.module.css';
import Slider from "../../components/Slider/Slider";

const Home = () => {
    return (
        <div className={s.home}>
            <Slider/>
        </div>
    );
};

export default Home;