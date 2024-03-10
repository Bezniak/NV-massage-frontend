import React, {useEffect, useRef, useState} from 'react';
import s from './Reviews.module.css';
import useFetch from '../../hooks/useFetch';
import useFetchAllData from '../../hooks/useFetchAllData';
import {FaRegStar} from 'react-icons/fa6';
import ReviewForm from './ReviewForm/ReviewForm';
import {Preloader} from '../../common/Preloader/Preloader';

const Reviews = () => {
    const [reviewCount, setReviewCount] = useState(5);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allLoaded, setAllLoaded] = useState(false);
    const reviewsContainerRef = useRef(null);
    const [isFormVisible, setIsFormVisible] = useState(false);

    const {data: dataMedia, loading: loadingMedia, error: errorMedia} = useFetch(`/reviews?populate=*`);
    const {data: comments, loading: commentsLoading, error: commentsError} = useFetchAllData(`/comments?populate=*`);

    const handleScroll = () => {
        if (reviewsContainerRef.current && reviewsContainerRef.current.getBoundingClientRect().bottom <= window.innerHeight) {
            setLoadingMore(true);
            setReviewCount(prevCount => prevCount + 5);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setAllLoaded(comments.length <= reviewCount);
    }, [comments, reviewCount]);

    return (
        <div>
            {errorMedia ? (
                <p>Что-то пошло не так</p>
            ) : loadingMedia ? (
                <Preloader/>
            ) : (
                <div
                    className={s.reviewsWrapper}
                    style={{
                        backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + dataMedia?.attributes?.imgBG?.data?.attributes?.url})`,
                    }}
                >
                    <h1>{dataMedia?.attributes?.title}</h1>
                    <p>{dataMedia?.attributes?.desc}</p>
                </div>
            )}

            <div ref={reviewsContainerRef} className={s.reviewsBlock}>
                <h1 className={s.reviewTitle}>
                    Отзывы - путь к лучшему опыту <span>{comments?.length}</span>
                </h1>
                {!isFormVisible && (
                    <button onClick={() => setIsFormVisible(true)} className={s.addReview}>
                        Добавить отзыв
                    </button>
                )}
                {isFormVisible && <ReviewForm/>}

                {commentsError ? (
                    <p>Что-то пошло не так</p>
                ) : commentsLoading ? (
                    <Preloader/>
                ) : (
                    comments
                        .slice(-reviewCount)
                        .reverse()
                        .map(com => (
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
                                    {com?.attributes?.createdAt &&
                                        new Date(com.attributes.createdAt).toLocaleDateString('ru-RU', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                </span>
                                <p>{com?.attributes?.comment}</p>
                            </div>
                        ))
                )}
                {!allLoaded && loadingMore && <Preloader/>}
            </div>

            {errorMedia ? (
                <p>Что-то пошло не так</p>
            ) : loadingMedia ? (
                <Preloader/>
            ) : (
                <div className={s.reviewsRules}>
                    <h2>{dataMedia?.attributes?.reviewRuleTitle}</h2>
                    <ul>
                        {dataMedia?.attributes?.reviewRuleDesc.map((item, index) => (
                            item?.children.map((i, idx) => <li key={idx}>{i?.text}</li>)
                        ))}
                    </ul>
                    <p>{dataMedia?.attributes?.reviewRuleConclusion_1}</p>
                    <p>{dataMedia?.attributes?.reviewRuleConclusion_2}</p>
                </div>
            )}
        </div>
    );
};

export default Reviews;
