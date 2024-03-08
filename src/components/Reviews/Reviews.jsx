import React, {useState} from 'react';
import s from './Reviews.module.css';
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import useFetchAllData from "../../hooks/useFetchAllData";
import ReviewForm from "./ReviewForm/ReviewForm";

const Reviews = () => {


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:1337/api/comments`, {
                data: {
                    name,
                    email,
                    comment,
                    publishedAt: null
                },


            });
            console.log(response.data);
            // Если требуется, выполните какие-то действия после успешной отправки комментария
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Если требуется, обработайте ошибку отправки комментария
        }
    };


    const {data: d, loading, error} = useFetch(`/reviews?populate=*`);

    // console.log(data)

    const {
        data: c,
        loading: l,
        error: e
    } = useFetchAllData(`/comments?fields[0]=name&fields[1]=comment&fields[2]=createdAt&populate=*`);


    console.log(c)


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

            <div>

                <div>
                    {c.map((com) => (
                        <div>
                            <h2>{com?.attributes?.name}</h2>
                            <p>{com?.attributes?.comment}</p>
                        </div>
                    ))}
                </div>


                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="comment">Comment:</label>
                        <textarea
                            id="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>


                <div>
                    <h1>LLLLLLL</h1>

                    <ReviewForm/>
                </div>

            </div>
        </div>
    );
};

export default Reviews;