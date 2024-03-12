import React, {useState} from 'react';
import styles from './Book.module.css';
import {useForm} from 'react-hook-form';
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import {format} from 'date-fns';
import useFetch from '../../hooks/useFetch';
import Select from 'react-select';
import useFetchAllData from "../../hooks/useFetchAllData";
import axios from "axios";

registerLocale('ru', ru);
setDefaultLocale('ru');

const Book = () => {
    const {data, loading: bookLoading, error: bookError} = useFetch('/books?populate=*');
    const {
        data: massageType,
        loading: massageTypeLoading,
        error: massageTypeError
    } = useFetchAllData('/products?populate=*');

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [selectedOption, setSelectedOption] = useState([]);

    console.log(selectedOption)

    const options = massageType.map(({attributes: {id, title, price}}) => ({
        value: id,
        label: title,
        price: price,
    }));

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } =
        useForm();

    const onSubmit = async (data) => {
        const formattedDateTime = selectedDate && selectedTime ? format(selectedDate, 'dd.MM.yyyy') + ' ' + format(selectedTime, 'HH:mm') : '';

        const massageTypeString = selectedOption ? selectedOption.label : '';

        const formData = {
            ...data,
            time: formattedDateTime,
            massageType: massageTypeString,
            price: selectedOption.price
        };
        console.log(formData);

        // Send form data to Telegram bot
        try {
            const response = await axios.post('https://api.telegram.org/bot6949973035:AAFPSIiancoDAA8OmNpfL_K-3TF1UUYAbZo/sendMessage', {
                chat_id: '6256895818',
                text: JSON.stringify(formData, null, 2),
            });
            console.log('Form data sent to Telegram bot:', response.data);
        } catch (error) {
            console.error('Error sending form data to Telegram bot:', error);
        }

        reset();
    };

    return (
        <>
            <div
                className={styles.bookWrapper}
                style={{
                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + data?.attributes?.imgBG?.data?.attributes?.url})`,
                }}
            >
                <h1>{data?.attributes?.title}</h1>
                <p>{data?.attributes?.description}</p>
            </div>

            <div className={styles.formWrapper}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <div className={styles.field}>
                        <label>Имя:</label>
                        <input
                            className={styles.input}
                            {...register('name', {
                                required: 'Это поле обязательно для заполнения',
                            })}
                            placeholder="Екатерина"
                        />
                        {errors.name && (
                            <span className={styles.error}>{errors.name.message}</span>
                        )}
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
                            placeholder="+375 29 000 00 00"
                        />
                        {errors.phone && (
                            <span className={styles.error}>{errors.phone.message}</span>
                        )}
                    </div>

                    <div className={styles.field}>
                        <div className={styles.dateBlock}>
                            <div>
                                <label htmlFor="date">Дата</label>
                                <DatePicker
                                    name="date"
                                    className={styles.dateInput}
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    placeholderText="Выберите дату"
                                    dateFormat="dd.MM.yyyy"
                                    locale="ru"
                                    required
                                />
                                {errors.date && (
                                    <span className={styles.error}>{errors.date.message}</span>
                                )}
                            </div>
                            <div>
                                <label htmlFor="time">Время</label>
                                <DatePicker
                                    name="time"
                                    className={styles.dateInput}
                                    selected={selectedTime}
                                    onChange={(time) => setSelectedTime(time)}
                                    showTimeSelect
                                    showTimeSelectOnly
                                    placeholderText="Выберите время"
                                    timeIntervals={30}
                                    timeCaption="Время"
                                    dateFormat="HH:mm"
                                    locale="ru"
                                    required
                                />
                                {errors.time && (
                                    <span className={styles.error}>{errors.time.message}</span>
                                )}
                            </div>
                        </div>
                    </div>
                    {massageTypeLoading ? (
                        <div>Загрузка...</div>
                    ) : (
                        <>
                            <label htmlFor="massageType">Выберите вид массажа</label>
                            <Select
                                options={options}
                                value={selectedOption}
                                onChange={setSelectedOption}
                                isClearable
                                isSearchable
                                placeholder="Вид массажа"
                                noOptionsMessage={() => 'Не найдено'}
                                required
                            />

                            {selectedOption && <p>Цена: {selectedOption.price}</p>}
                        </>
                    )}
                    {massageTypeError && (
                        <div>Error loading options: {massageTypeError.message}</div>
                    )}

                    <div className={styles.field}>
                        <label>Сообщение:</label>
                        <textarea
                            className={styles.input}
                            {...register('message', {})}
                            placeholder="Сообщение..."
                        />
                    </div>

                    <button type="submit" className={styles.button}>
                        Отправить
                    </button>
                </form>
            </div>
        </>
    );
};

export default Book;
