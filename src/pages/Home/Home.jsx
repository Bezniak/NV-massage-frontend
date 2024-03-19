import React from 'react';
import Slider from "../../components/Slider/Slider";
import Introduction from "../../components/Introduction/Introduction";
import PhotoCollection from "../../components/PhotoCollection/PhotoCollection";
import useFetch from "../../hooks/useFetch";

const Home = () => {

    const {data, loading, error} = useFetch('/photo-collections?populate=*');


    return (
        <div>
            <Slider/>
            <Introduction type={'introductions'}/>
            <PhotoCollection data={data?.attributes?.img} loading={loading} error={error}
                             title={data?.attributes?.title}/>
            <Introduction type={'conclusions'}/>
        </div>
    );
};

export default Home;