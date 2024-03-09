import React, {useEffect, useRef, useState} from 'react';
import s from './Reviews.module.css';
import useFetch from "../../hooks/useFetch";
import useFetchAllData from "../../hooks/useFetchAllData";
import {FaRegStar} from "react-icons/fa6";
import ReviewForm from "./ReviewForm/ReviewForm";

const Reviews = () => {

    const [reviewCount, setReviewCount] = useState(5);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false); // Состояние для отслеживания загрузки всех отзывов
    const reviewsContainerRef = useRef(null); // Реф для контейнера отзывов
    const [isFormVisible, setIsFormVisible] = useState(false);

    const {data: d, loading, error} = useFetch(`/reviews?populate=*`);

    const {
        data: c,
        loading: l,
        error: e
    } = useFetchAllData(`/comments?fields[0]=name&fields[1]=comment&fields[2]=createdAt&fields[3]=grade&populate=*`);


    console.log(c)

    const handleScroll = () => {
        if (
            reviewsContainerRef.current &&
            reviewsContainerRef.current.getBoundingClientRect().bottom <= window.innerHeight
        ) {
            setLoadingMore(true);
            setReviewCount(prevCount => prevCount + 5);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Обновляем состояние allLoaded, когда все отзывы загружены
    useEffect(() => {
        if (c.length <= reviewCount) {
            setAllLoaded(true);
        } else {
            setAllLoaded(false);
        }
    }, [c, reviewCount]);

    return (
        <div>
            <div className={s.reviewsWrapper}
                 style={{
                     backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + d?.attributes?.imgBG?.data?.attributes?.url})`,
                 }}
            >
                <h1>{d?.attributes?.title}</h1>
                <p>{d?.attributes?.desc}</p>
            </div>

            <div ref={reviewsContainerRef} className={s.reviewsBlock}>
                <h1 className={s.reviewTitle}>Отзывы - путь к лучшему опыту <span>{c?.length}</span></h1>
                <button
                    style={{display: isFormVisible ? 'none' : ''}}
                    onClick={() => setIsFormVisible(true)}
                    className={s.addReview}
                >
                    Добавить отзыв
                </button>
                {isFormVisible && < ReviewForm/>}
                <div>
                    {c.slice(0, reviewCount).map((com) => (
                        <div key={com.id} className={s.reviewItem}>
                            <div>
                                {Array.from({length: 5}, (_, index) => (
                                    <FaRegStar
                                        className={s.grade}
                                        key={index}
                                        color={index < com?.attributes?.grade ? '#ffc107' : 'gray'}
                                        size={20}
                                    />
                                ))}
                            </div>
                            <h3>{com?.attributes?.name}</h3>
                            <span>
                                {com?.attributes?.createdAt
                                    ? new Date(com.attributes.createdAt).toLocaleDateString('ru-RU', {
                                        day: 'numeric',
                                        month: 'long',
                                        year: 'numeric',
                                    })
                                    : null}
                            </span>
                            <p>{com?.attributes?.comment}</p>
                        </div>
                    ))}
                    {!allLoaded && loadingMore &&
                        <p>Загрузка...</p>} {/* Показываем индикатор загрузки, если не все отзывы загружены */}
                </div>
            </div>
        </div>
    );
};

export default Reviews;
