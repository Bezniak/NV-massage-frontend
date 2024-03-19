import React, {useState} from 'react';
import styles from './Book.module.css';
import useFetch from '../../hooks/useFetch';
import {Preloader} from '../../common/Preloader/Preloader';
import {Controller, useForm} from 'react-hook-form';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import Select from 'react-select';
import useFetchAllData from '../../hooks/useFetchAllData';
import axios from "axios";

registerLocale('ru', ru);
setDefaultLocale('ru');

const Book = () => {
    const {data: bookData, loading: bookLoading, error: bookError} = useFetch('/books?populate=*');
    const {data: contact, loading: contactLoading, error: contactError} = useFetch('/contacts?populate=*');
    const [totalPrice, setTotalPrice] = useState(0);
    const today = new Date();
    const openTime = contact?.attributes?.openTime;
    const closeTime = contact?.attributes?.lastTimeForBook;
    const formattedMinTime = openTime ? new Date(`01/01/2000 ${openTime}`) : null;
    const formattedMaxTime = closeTime ? new Date(`01/01/2000 ${closeTime}`) : null;
    const [isFormSend, setIsFormSend] = useState(false)
    const [formData, setFormData] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false);


    const {
        data: massageType,
        loading: massageTypeLoading,
        error: massageTypeError
    } = useFetchAllData('/products?populate=*');

    const {
        register,
        reset,
        handleSubmit,
        formState: {errors},
        control,
        setValue,
        watch,
    } = useForm({
        shouldUnregister: true, // Указываем, что все поля должны быть зарегистрированы
    });


    const calculateTotalPrice = (selectedMassages) => {
        let total = 0;
        selectedMassages.forEach((massage) => {
            total += massage.price;
        });
        setTotalPrice(total);
    };

    const onSubmit = async (data) => {
        setIsSubmitting(true); // устанавливаем состояние отправки в true
        data.massageType = data.massageType.map(item => item.label).join(', ');
        data.comment = data.comment.trim();
        data.startDate = data.startDate.toLocaleDateString('ru');
        data.startTime = data.startTime.value.props.value;
        data.totalPrice = totalPrice.toFixed(2);
        setFormData(data)

        console.log(data)

        // Send form data to Telegram bot
        try {
            const response = await axios.post(`https://api.telegram.org/bot${process.env.REACT_APP_TELEGRAM_KEY}/sendMessage`, {
                chat_id: process.env.REACT_APP_TELEGRAM_CHAT_ID,
                text: JSON.stringify(data, null, 2),
            });
            console.log('Form data sent to Telegram bot:', response.data);
            setIsFormSend(true)
        } catch (error) {
            alert('Возникла ошибка при отправке данных в Telegram: ' + error);
        }


        // Send form data to Strapi
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/client-booked-from-sites`, {
                data: {...data}
            });
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер Strapi:', error);
        }


        setIsSubmitting(false);
        reset();
        setValue('massageType', '');
    };


    function filterPastTimes(options) {
        const currentTime = new Date();
        return options.filter(option => {
            const [hours, minutes] = option.split(':');
            const timeToCompare = new Date(currentTime);
            timeToCompare.setHours(hours);
            timeToCompare.setMinutes(minutes);
            return timeToCompare > currentTime;
        });
    }


    function generateTimeOptions(isTodaySelected, openTime, closeTime) {
        const options = [];
        const currentTime = new Date(openTime);
        const endTime = new Date(closeTime);

        while (currentTime <= endTime) {
            options.push(formatTime(currentTime));
            currentTime.setMinutes(currentTime.getMinutes() + 60); // Увеличиваем время на 30 минут
        }

        // Если выбрана сегодняшняя дата, применяем фильтрацию времени
        if (isTodaySelected) {
            const filteredOptions = filterPastTimes(options);
            return filteredOptions.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ));
        }

        // Если выбрана любая другая дата, возвращаем все опции времени без фильтрации
        return options.map(option => (
            <option key={option} value={option}>
                {option}
            </option>
        ));
    }

    function isToday(date) {
        if (!date) return false;
        const today = new Date();
        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    }


    function formatTime(date) {
        return date.toLocaleTimeString('ru', {hour: '2-digit', minute: '2-digit'});
    }

    const filterDate = (date) => {
        // Проверяем, является ли день выходным
        const day = date.getDay();
        return day !== contact?.attributes?.weekend_1 && day !== contact?.attributes?.weekend_2; // Разрешаем выбор только для дней, кроме воскресенья и понедельника
    };

    return (
        <>
            {
                bookError ? <p>Ошибка полуния данных</p>
                    : bookLoading ? <Preloader/>
                        :
                        <>
                            <div
                                className='welcomeBlock'
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + bookData?.attributes?.imgBG?.data?.attributes?.url})`,
                                }}
                            >
                                <h1>{bookData?.attributes?.title}</h1>
                                <p>{bookData?.attributes?.description}</p>
                            </div>

                            <div className={styles.formWrapper}>
                                {isFormSend ?
                                    <div className={styles.titleAfterBook}>{formData.name}, брагодарим Вас за
                                        бронирование
                                        на {formData.massageType}.
                                        <br/>
                                        Вы записаны на <span className={styles.mainInfo}>{formData.startDate}</span> в <span
                                            className={styles.mainInfo}>{formData.startTime}</span> по
                                        адресу: <span className={styles.mainInfo}>{contact?.attributes?.address}</span>
                                        <br/>
                                        <span className={styles.mainInfo}>Сумма к оплате: {formData.totalPrice} BYN</span>
                                    </div>
                                    : (
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <h2>Забронировать массаж!</h2>
                                            <label htmlFor="name">Имя:</label>
                                            <input
                                                type="text" {...register('name', {required: 'Это поле обязательно для заполнения!'})}
                                                placeholder="Екатерина"/>
                                            {errors.name && <span>{errors.name.message}</span>}

                                            <label htmlFor="phone">Телефон:</label>
                                            <input
                                                type="phone"
                                                {...register('phone', {
                                                    required: 'Это поле обязательно для заполнения!',
                                                    pattern: {
                                                        value: /^\+?\d{1,3}(\s?|\(\d{1,4}\))?([\s.-]?\d{1,4}){2,}$/,
                                                        message: 'Некорректный формат номера телефона',
                                                    },
                                                })}
                                                placeholder="+375 29 333 33 33"
                                            />
                                            {errors.phone && <span>{errors.phone.message}</span>}

                                            <label htmlFor="startDate">Дата и время:</label>
                                            <Controller
                                                control={control}
                                                name="startDate"
                                                rules={{required: 'Это поле обязательно для заполнения!'}}
                                                render={({field}) => (
                                                    <>
                                                        <DatePicker
                                                            selected={field.value}
                                                            onChange={value => {
                                                                field.onChange(value);
                                                                setValue('startTime', ''); // Сбрасываем выбранное время при изменении даты
                                                            }}
                                                            placeholderText="Выберите дату"
                                                            filterDate={filterDate}
                                                            dateFormat="dd.MM.yyyy"
                                                            locale="ru"
                                                            minDate={today}
                                                            wrapperClassName={styles.datePicker}
                                                        />
                                                        {errors.startDate && <span>{errors.startDate.message}</span>}
                                                    </>
                                                )}
                                            />

                                            <Controller
                                                control={control}
                                                name="startTime"
                                                rules={{required: 'Это поле обязательно для заполнения!'}}
                                                render={({field}) => (
                                                    <>
                                                        <Select
                                                            options={[
                                                                {
                                                                    value: '',
                                                                    label: 'Выберите время',
                                                                    disabled: true,
                                                                    isPlaceholder: true
                                                                },
                                                                ...(formattedMinTime && formattedMaxTime
                                                                    ? generateTimeOptions(
                                                                        isToday(watch('startDate')),
                                                                        formattedMinTime,
                                                                        formattedMaxTime
                                                                    ).map((time) => ({value: time, label: time}))
                                                                    : [])
                                                            ]}
                                                            value={field.value}
                                                            onChange={(value) => field.onChange(value)}
                                                            placeholder="Выберите время"
                                                            isClearable
                                                        />
                                                        {errors.startTime && <span>{errors.startTime.message}</span>}
                                                    </>
                                                )}
                                            />


                                            <label htmlFor="massageType">Вид массажа:</label>
                                            <Controller
                                                control={control}
                                                name="massageType"
                                                rules={{
                                                    required: 'Это поле обязательно для заполнения!',
                                                }}
                                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                                    <div>
                                                        <Select
                                                            options={massageType?.map((item) => ({
                                                                value: item.id, // or any unique identifier for the option
                                                                label: item.attributes.title,
                                                                price: item.attributes.price,
                                                            }))}
                                                            value={value}
                                                            onChange={(selectedOptions) => {
                                                                onChange(selectedOptions);
                                                                calculateTotalPrice(selectedOptions);
                                                            }}
                                                            isClearable
                                                            isMulti
                                                            isSearchable
                                                            placeholder="Выберите вид массажа"
                                                        />
                                                        {error && <span>{error.message}</span>}
                                                    </div>
                                                )}
                                            />

                                            <label htmlFor="comment">Комментарий:</label>
                                            <textarea {...register('comment', {})} placeholder="Коментарий..."/>

                                            <p>Итого: {totalPrice.toFixed(2)} BYN</p>

                                            <button className={styles.btn} type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? 'Отправка...' : 'Забронировать!'}
                                            </button>
                                        </form>
                                    )
                                }
                            </div>
                        </>
            }
        </>
    );
};

export default Book;
