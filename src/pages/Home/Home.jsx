import React from 'react';
import s from './Home.module.css';
import Slider from "../../components/Slider/Slider";
import Introduction from "../../components/Introduction/Introduction";
import PhotoCollection from "../../components/PhotoCollection/PhotoCollection";

const Home = () => {
    return (
        <div className={s.home}>
            <Slider/>
            <Introduction type={'introductions'}/>
            <PhotoCollection/>
            <Introduction type={'conclusions'}/>
        </div>
    );
};

export default Home;