import React from 'react';
import s from './PrivacyPolicy.module.css';
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import useFetchAllData from "../../hooks/useFetchAllData";


const PrivacyPolicy = () => {

    const {data, loading, error} = useFetch('/privacy-policies?populate=*');
    const {data: d, loading: l, error: e} = useFetchAllData('/privacies?populate=*');

    return (
        error ? <p>Что-то пошло не так</p>
            : loading ? <Preloader/>
                : (
                    <React.Fragment>
                        <div className='welcomeBlock'
                             style={{
                                 backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                             }}
                        >
                            <h1>{data?.attributes?.title}</h1>
                        </div>
                        <div className={s.privacyBlock}>
                           <div className={s.privacyContent}>
                               {d.map((item) => (
                                   <div key={item.id}>
                                       <h2>{item?.attributes?.title}</h2>
                                       <ul>
                                           {item?.attributes?.description.map((d, index) => (
                                               <li key={index}>{d?.children[0].text}</li>
                                           ))}
                                       </ul>
                                   </div>
                               ))}
                           </div>
                        </div>
                    </React.Fragment>
                )
    );
};

export default PrivacyPolicy;