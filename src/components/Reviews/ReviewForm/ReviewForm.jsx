import React, {useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import {NavLink} from 'react-router-dom';
import {FaRegStar} from 'react-icons/fa6';
import axios from 'axios';
import styles from './ReviewForm.module.css';

function ReviewForm() {
    const [rating, setRating] = useState(0);
    const [isFormSend, setIsFormSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        setError,
        clearErrors,
        formState: {errors},
        watch,
        trigger,
    } = useForm();

    const watchCheckbox = watch('agreement', false);

    const onSubmit = async (data) => {
        if (rating === 0) {
            setError('grade', {
                type: 'manual',
                message: 'Пожалуйста, выберите оценку',
            });
            return;
        }

        setIsLoading(true);

        try {
            await axios.post(process.env.REACT_APP_API_URL + `/comments`, {
                data: {...data, grade: rating, publishedAt: null},
            });
            setIsFormSend(true);
        } catch (error) {
            console.error('Error submitting comment:', error);
        } finally {
            setIsLoading(false);
            setIsFormSend(true);
        }

        reset();
        setRating(0);
    };

    const handleBlur = async (field) => {
        await trigger(field);
    };

    const handleClick = () => {
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    const renderGradeStars = useMemo(() => {
        return Array.from({length: 5}, (_, index) => (
            <FaRegStar
                key={index}
                color={index < rating ? '#ffc107' : 'gray'}
                size={28}
                onClick={() => {
                    setRating(index + 1);
                    clearErrors('grade');
                }}
                onBlur={() => handleBlur('grade')}
            />
        ));
    }, [rating, clearErrors, handleBlur]);


    return (
        <>
            {isFormSend ? (
                <h1 className={styles.reviewTitle}>
                    Спасибо за Ваш отзыв! <br/>
                    Он будет опубликован в ближайшее время после проверки модератором.
                </h1>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <label>Имя:</label>
                        <input
                            className={styles.input}
                            {...register('name', {
                                required: 'Это поле обязательно для заполнения'
                            })}
                            onBlur={() => handleBlur('name')}
                            placeholder='Екатерина'
                        />
                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Телефон:</label>
                        <input
                            className={styles.input}
                            {...register('phone', {
                                required: 'Это поле обязательно для заполнения',
                                pattern: {
                                    value: /^\+?\d{1,3}(\s?|\(\d{1,4}\))?([\s.-]?\d{1,4}){2,}$/,
                                    message: 'Некорректный формат номера телефона',
                                },
                            })}
                            onBlur={() => handleBlur('phone')}
                            placeholder='+375 29 333 33 33'
                        />
                        <span className={styles.protection}>Укажите номер телефона на который было бронирование. На сайте отображаться не будет</span>
                        <br/>
                        {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Email:</label>
                        <input
                            className={styles.input}
                            type="email"
                            {...register('email', {
                                required: 'Это поле обязательно для заполнения',
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                                    message: 'Некорректный формат email-адреса',
                                },
                            })}
                            onBlur={() => handleBlur('email')}
                            placeholder='kate@gmail.com'
                        />
                        <span className={styles.protection}>На сайте отображаться не будет</span>
                        <br/>
                        {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <label>Отзыв:</label>
                        <textarea
                            className={styles.textarea}
                            {...register('comment', {
                                required: 'Это поле обязательно для заполнения'
                            })}
                            onBlur={() => handleBlur('comment')}
                            placeholder='Ваш отзыв...'
                        />
                        {errors.comment && <span className={styles.error}>{errors.comment.message}</span>}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="grade">Оценка:</label>
                        {Array.from({length: 5}, (_, index) => (
                            <FaRegStar
                                className={styles.grade}
                                key={index}
                                color={index < rating ? '#ffc107' : 'gray'}
                                size={28}
                                onClick={() => {
                                    setRating(index + 1);
                                    clearErrors('grade');
                                }}
                                onBlur={() => handleBlur('grade')}
                            />
                        ))}
                        <br/>
                        {errors.grade && (
                            <span className={styles.error}>{errors.grade.message}</span>
                        )}
                    </div>


                    <div className={styles.field}>
                        <label>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                {...register('agreement', {
                                    required: 'Вы должны согласиться с условиями'
                                })}
                            />
                            Подтверждаю ознакомление с <NavLink className={styles.link} to='/privacyPolicy'
                                                                onClick={handleClick}>правами, механизмом их
                            реализации</NavLink> и даю согласие
                            на обработку персональных данных с целью рассмотрения, опубликования и анализа отзыва
                        </label>
                        {errors.agreement && <span className={styles.error}>{errors.agreement.message}</span>}
                    </div>

                    <button type="submit" className={styles.button}
                            disabled={!watchCheckbox || isLoading}>{isLoading ? 'Отправка...' : 'Отправить'}</button>

                    <p className={styles.info}>
                        Убедительная просьба: если ваш отзыв содержит претензию к качеству оказываемой услуги или
                        сервису,
                        пожалуйста, укажите телефон, оставленный вами при бронировании, чтобы мы могли уточнить
                        обстоятельства и
                        дать
                        конкретный ответ по вашему вопросу. Мы гарантируем конфиденциальность ваших личных данных.
                        Благодарим за
                        понимание.
                    </p>
                    <p className={styles.info2}>
                        Обработка отзывов осуществляется только в рабочие дни и может занять до 7 дней.
                    </p>
                </form>
            )
            }
        </>
    );
}

export default ReviewForm;
