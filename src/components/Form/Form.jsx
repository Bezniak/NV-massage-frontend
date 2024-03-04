import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import emailjs from 'emailjs-com';
import styles from './Form.module.css';

function Form() {
    const {register, handleSubmit, formState: {errors}, setValue, reset} = useForm();
    const [isAgreed, setIsAgreed] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleAgreementChange = (e) => {
        setIsAgreed(e.target.checked);
    };

    const onSubmit = (data) => {
        if (!isAgreed) {
            alert('Вы должны согласиться на обработку персональных данных');
            return;
        }

        const templateParams = {
            from_name: data.name,
            from_email: data.email,
            to_email: 'baranovichimassage@gmail.com',
            phone: data.phone,
            message: data.message,
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
            });
    };

    return (
        <>
            {isEmailSent ? (
                <h2 className={styles.formSend}>Письмо отправлено! Мы свяжемся с Вами в ближайшее время!</h2>
            ) : (
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h1>Обратная связь</h1>
                    <p>Если у Вас возникли вопросы, на которые Вы не нашли ответа — напишите нам. За этой формой
                        скрывается не обычный консультант, а настоящая человеческая поддержка, так что задавайте любые
                        вопросы — мы обязательно поможем.</p>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Имя</label>
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
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            {...register('email', {required: true})}
                            placeholder="GMAIL@GMAIL.COM"
                            className={styles.input}
                        />
                        {errors.email && <span className={styles.error}>Это поле обязательно</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="phone" className={styles.label}>Телефон:</label>
                        <input
                            type="text"
                            id="phone"
                            {...register('phone', {required: true})}
                            placeholder="+375 (29) 222 22 22"
                            className={styles.input}
                        />
                        {errors.phone && <span className={styles.error}>Это поле обязательно</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>Сообщение:</label>
                        <textarea
                            id="message"
                            {...register('message', {required: true})}
                            className={styles.textarea}
                            placeholder="ВАШЕ СООБЩЕНИЕ..."
                        />
                        {errors.message && <span className={styles.error}>Это поле обязательно</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <input
                            type="checkbox"
                            id="agreement"
                            checked={isAgreed}
                            onChange={handleAgreementChange}
                            className={styles.checkbox}
                        />
                        <label htmlFor="agreement" className={styles.agreementLabel}>Даю согласие на обработку
                            персональных данных</label>
                    </div>
                    <button type="submit" disabled={!isAgreed} className={styles.button}>Отправить</button>
                </form>
            )}
        </>
    );
}

export default Form;
