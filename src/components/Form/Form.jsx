import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from './Form.module.css';
import {NavLink} from 'react-router-dom';
import {animateScroll as scroll} from 'react-scroll';
import useFetch from '../../hooks/useFetch';
import * as emailjs from "emailjs-com";

function Form() {
    const {data: contactData, loading: contactLoading, error: contactError} = useFetch(
        '/contacts?populate=*'
    );

    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = (data) => {
        setIsLoading(true);

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            to_email: 'baranovichimassage@gmail.com',
            phone: data.phone,
            message: data.message,
            topic: data.topic,
        };

        emailjs
            .send(
                process.env.REACT_APP_SERVICE_ID,
                process.env.REACT_APP_TEMPLATE_ID,
                templateParams,
                process.env.REACT_APP_USER_ID
            )
            .then((response) => {
                console.log('Email успешно отправлен!', response.status, response.text);
                setIsEmailSent(true);
                reset(); // Reset the form fields
            })
            .catch((error) => {
                console.error('Произошла ошибка при отправке электронной почты:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleClick = () => {
        // Плавный скролл вверх с использованием react-scroll
        scroll.scrollToTop({
            duration: 0, // Продолжительность анимации в миллисекундах
            smooth: 'easeInOutQuad', // Тип анимации
        });
    };

    return (
        <>
            {isEmailSent ? (
                <h2 className={styles.formSend}>
                    Письмо отправлено! <br/> Мы свзяжемся с Вами в ближайшее время!
                </h2>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h2>Обратная связь</h2>
                    <p>
                        Если у Вас возникли вопросы, на которые Вы не нашли ответа — напишите мне. За этой формой
                        скрывается не обычный консультант, а настоящая человеческая поддержка, так что задавайте любые
                        вопросы — я обязательно помогу.
                    </p>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>
                            Имя
                        </label>
                        <input
                            type="text"
                            id="name"
                            {...register('name', {required: true})}
                            placeholder="ЕКАТЕРИНА СЕРГЕЕВНА"
                            className={styles.input}
                        />
                        {errors.name && <span className={styles.error}>Это поле обязательно</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/})}
                            placeholder="GMAIL@GMAIL.COM"
                            className={styles.input}
                        />
                        {errors.email && errors.email.type === 'required' && (
                            <span className={styles.error}>Это поле обязательно</span>
                        )}
                        {errors.email && errors.email.type === 'pattern' && (
                            <span className={styles.error}>Неверный формат email</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>
                            Телефон:
                        </label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone', {
                                required: true,
                                pattern: /^\+?[0-9()-]{7,}$/ // Регулярное выражение для проверки номера телефона
                            })}
                            placeholder="+375 (29) 222 22 22"
                            className={styles.input}
                        />
                        {errors.phone && errors.phone.type === 'required' && (
                            <span className={styles.error}>Это поле обязательно</span>
                        )}
                        {errors.phone && errors.phone.type === 'pattern' && (
                            <span className={styles.error}>Неверный формат номера телефона</span>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="topic" className={styles.label}>
                            Тема:
                        </label>
                        <input
                            type="text"
                            id="topic"
                            {...register('topic', {required: true})}
                            placeholder="ТЕМА..."
                            className={styles.input}
                        />
                        {errors.topic && <span className={styles.error}>Это поле обязательно</span>}
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>
                            Сообщение:
                        </label>
                        <textarea
                            id="message"
                            {...register('message', {required: true})}
                            className={styles.textarea}
                            placeholder="ВАШЕ СООБЩЕНИЕ..."
                        />
                        {errors.message && <span className={styles.error}>Это поле обязательно</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <p className={styles.agreementLabel}>
                            Отправляя эту форму, я подтверждаю, что прочитал и принимаю{' '}
                            <NavLink to="/privacyPolicy" onClick={handleClick}>
                                политику конфиденциальности
                            </NavLink>{' '}
                            {contactData?.attributes?.companyName}.
                        </p>
                    </div>
                    <button disabled={isLoading} type="submit" className={styles.button}>
                        {isLoading ? 'Отправка...' : 'Отправить'}
                    </button>
                </form>
            )}
        </>
    );
}

export default Form;
