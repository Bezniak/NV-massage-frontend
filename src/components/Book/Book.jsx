import React, {useState} from 'react';
import styles from "./Book.module.css";
import useFetch from "../../hooks/useFetch";
import {Preloader} from "../../common/Preloader/Preloader";
import {Controller, useForm} from "react-hook-form";
import DatePicker, {registerLocale, setDefaultLocale} from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';
import Select from "react-select";
import useFetchAllData from "../../hooks/useFetchAllData";


registerLocale('ru', ru);
setDefaultLocale('ru');

const Book = () => {
    const {data: bookData, loading: bookLoading, error: bookError} = useFetch('/books?populate=*');
    const {data: contact, loading: contactLoading, error: contactError} = useFetch('/contacts?populate=*');
    const [totalPrice, setTotalPrice] = useState(0);


    const minTime = contact?.attributes?.minTime;
    const maxTime = contact?.attributes?.maxTime;
    const formattedMinTime = minTime ? new Date(`01/01/2000 ${minTime}`) : null;
    const formattedMaxTime = maxTime ? new Date(`01/01/2000 ${maxTime}`) : null;


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
    } = useForm();

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div>
            <div>
                {bookError ? <p>Что-то пошло не так!</p>
                    : bookLoading ? <Preloader/>
                        : (
                            <div
                                className={styles.bookWrapper}
                                style={{
                                    backgroundImage: `url(${process.env.REACT_APP_UPLOAD_URL + bookData?.attributes?.imgBG?.data?.attributes?.url})`,
                                }}
                            >
                                <h1>{bookData?.attributes?.title}</h1>
                                <p>{bookData?.attributes?.description}</p>
                            </div>
                        )
                }
            </div>

            <div className={styles.formWrapper}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h1>Забронировать массаж!</h1>

                    <div>
                        <label htmlFor="name">Имя:</label>
                        <input
                            type="text"
                            {...register('name', {
                                required: 'Это поле обязательно для заполнения!',
                            })}
                            placeholder='Екатерина'
                        />
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
                                }
                            })}
                            placeholder='+375 29 333 33 33'
                        />
                        {errors.phone && <span>{errors.phone.message}</span>}
                    </div>

                    <div>
                        <label htmlFor="startDate">Дата:</label>
                        <Controller
                            control={control}
                            name="startDate"
                            rules={{
                                required: 'Это поле обязательно для заполнения!',
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <div>
                                    <DatePicker
                                        showIcon
                                        selected={value}
                                        onChange={onChange}
                                        placeholderText='Выберите дату'
                                        dateFormat="dd.MM.yyyy"
                                        locale="ru"
                                    />
                                    {error && <span>{error.message}</span>}
                                </div>
                            )}
                        />
                    </div>

                    <div>
                        <label htmlFor="startTime">Время:</label>
                        <Controller
                            control={control}
                            name="startTime"
                            rules={{
                                required: 'Это поле обязательно для заполнения!',
                            }}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <div>
                                    <DatePicker
                                        selected={value}
                                        onChange={onChange}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={30}
                                        minTime={formattedMinTime}
                                        maxTime={formattedMaxTime}
                                        placeholderText="Выберите время"
                                        timeCaption="Время"
                                        dateFormat="HH:mm"
                                        locale="ru"
                                    />
                                    {error && <span>{error.message}</span>}
                                </div>
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
                                            price: item.attributes.price
                                        }))}
                                        value={value}
                                        onChange={onChange}
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
                        <textarea
                            {...register('comment', {})}
                            placeholder='Коментарий...'
                        />
                    </div>

                    <div>
                        <p>Итого: {totalPrice} BYN</p>
                    </div>

                    <button type='submit'>Забронировать!</button>
                </form>
            </div>
        </div>
    );
};

export default Book;