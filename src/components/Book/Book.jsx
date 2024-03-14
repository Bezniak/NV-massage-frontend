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
    const minTime = contact?.attributes?.minTime;
    const maxTime = contact?.attributes?.maxTime;
    const formattedMinTime = minTime ? new Date(`01/01/2000 ${minTime}`) : null;
    const formattedMaxTime = maxTime ? new Date(`01/01/2000 ${maxTime}`) : null;
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
        data.totalPrice = totalPrice.toFixed(2);
        setFormData(data)

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

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/client-booked-from-sites`, {
                data: {...data}
            });
        } catch (error) {
            console.error('Ошибка при отправке данных на сервер Strapi:', error);
        }



        setIsSubmitting(false); // устанавливаем состояние отправки в false после завершения отправки
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


    function generateTimeOptions(isTodaySelected, minTime, maxTime) {
        const options = [];
        const currentTime = new Date(minTime);
        const endTime = new Date(maxTime);

        while (currentTime <= endTime) {
            options.push(formatTime(currentTime));
            currentTime.setMinutes(currentTime.getMinutes() + 30); // Увеличиваем время на 30 минут
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
        if (!date) return false; // Проверка на null
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


    return (
        <div>
            <div>
                {bookError ? (
                    <p>Что-то пошло не так!</p>
                ) : bookLoading ? (
                    <Preloader/>
                ) : (
                    <div
                        className={styles.bookWrapper}
                        style={{
                            backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + bookData?.attributes?.imgBG?.data?.attributes?.url})`,
                        }}
                    >
                        <h1>{bookData?.attributes?.title}</h1>
                        <p>{bookData?.attributes?.description}</p>
                    </div>
                )}
            </div>

            <div className={styles.formWrapper}>
                {
                    isFormSend ?
                        <h2 className={styles.titleAfterBook}>{formData.name}, брагодарим Вас за бронирование
                            на {formData.massageType}.
                            <br/>
                            Вы записаны на {formData.startDate} в {formData.startTime} по
                            адресу: {contact?.attributes?.address}
                            <br/>
                            Сумма к оплате: {formData.totalPrice} BYN
                        </h2>
                        : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <h1>Забронировать массаж!</h1>

                                <div>
                                    <label htmlFor="name">Имя:</label>
                                    <input
                                        type="text" {...register('name', {required: 'Это поле обязательно для заполнения!'})}
                                        placeholder="Екатерина"/>
                                    {errors.name && <span>{errors.name.message}</span>}
                                </div>

                                <div>
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
                                </div>

                                <div>
                                    <label htmlFor="startDate">Дата и время:</label>
                                    <Controller
                                        control={control}
                                        name="startDate"
                                        rules={{
                                            required: 'Это поле обязательно для заполнения!',
                                        }}
                                        render={({field: {onChange, value}, fieldState: {error}}) => (
                                            <>
                                                <DatePicker
                                                    selected={value}
                                                    onChange={(date) => {
                                                        onChange(date);
                                                        setValue('startTime', ''); // Сбрасываем выбранное время при изменении даты
                                                    }}
                                                    placeholderText="Выберите дату"
                                                    dateFormat="dd.MM.yyyy"
                                                    locale="ru"
                                                    minDate={today}
                                                    wrapperClassName={styles.datePicker}
                                                />

                                                {error && <span>{error.message}</span>}
                                                <select
                                                    {...register('startTime', {
                                                        required: 'Это поле обязательно для заполнения!'
                                                    })}
                                                    value={watch('startTime')}
                                                >
                                                    <option value="" disabled>Выберите время</option>
                                                    {formattedMinTime && formattedMaxTime && (
                                                        generateTimeOptions(isToday(watch('startDate')), formattedMinTime, formattedMaxTime)
                                                    )}
                                                </select>
                                                {errors.startTime && <span>{errors.startTime.message}</span>}

                                            </>
                                        )}
                                    />

                                </div>

                                <div>
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
                                </div>

                                <div>
                                    <label htmlFor="comment">Комментарий:</label>
                                    <textarea {...register('comment', {})} placeholder="Коментарий..."/>
                                </div>

                                <div>
                                    <p>Итого: {totalPrice.toFixed(2)} BYN</p>
                                </div>

                                <button className={styles.btn} type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Отправка...' : 'Забронировать!'}
                                </button>
                            </form>
                        )
                }
            </div>
        </div>
    );
};

export default Book;
