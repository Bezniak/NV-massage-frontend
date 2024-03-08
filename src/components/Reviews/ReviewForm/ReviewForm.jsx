import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './ReviewForm.module.css';
import {NavLink} from "react-router-dom";
import {animateScroll as scroll} from "react-scroll"; // Импортируем модульные стили

function ReviewForm() {
    const {register, reset, handleSubmit, formState: {errors}, watch, trigger} = useForm();
    const onSubmit = (data) => {
        console.log(data)

        reset()
    };

    const watchCheckbox = watch('agreement', false);

    const handleBlur = async (field) => {
        // Вызываем проверку валидации после потери фокуса
        await trigger(field);
    };

    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.field}>
                <label>Имя:</label>
                <input
                    className={styles.input}
                    {...register('name', {
                        required: 'Это поле обязательно для заполнения'
                    })}
                    onBlur={() => handleBlur('name')}
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
                />
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
                />
                {errors.email && <span className={styles.error}>{errors.email.message}</span>}
            </div>

            <div className={styles.field}>
                <label>Отзыв:</label>
                <textarea
                    className={styles.input}
                    {...register('review', {
                        required: 'Это поле обязательно для заполнения'
                    })}
                    onBlur={() => handleBlur('review')}
                />
                {errors.review && <span className={styles.error}>{errors.review.message}</span>}
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
                    Подтверждаю ознакомление с <NavLink to='/privacyPolicy' onClick={handleClick}>правами, механизмом их реализации</NavLink> и даю согласие
                    на обработку персональных данных с целью рассмотрения, опубликования и анализа отзыва
                </label>
                {errors.agreement && <span className={styles.error}>{errors.agreement.message}</span>}
            </div>

            <button type="submit" className={styles.button} disabled={!watchCheckbox}>Отправить</button>
        </form>
    );
}

export default ReviewForm;
