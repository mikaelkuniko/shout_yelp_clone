import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../../store/session';
import { allReviews } from "../../store/review";
import './index.css'

function FavoriteBusinesses({ id, name, city, state, preview_image, num_reviews, sum_rating }) {
    const dispatch = useDispatch()
    const [bookMark, setBookMark] = useState(true)

    const currentUser = useSelector(state => state.session.user)
    const userBusinesses = currentUser.user_businesses

    // Review average rating
    const totalReviews = Object.values(useSelector((state)=> state.reviews.allReviews))

    const bizReviews = totalReviews.filter((review) => Number(id) === Number(review.business_id))

    let sum = 0;

    for (let i = 0; i < bizReviews.length; i++) {
        sum += bizReviews[i].stars
    }

    const avg = sum / bizReviews.length

    //Star images
    let noFill = <i className="fa-solid fa-star stars noFill" />
    let fill = <i className="fa-solid fa-star stars fill" />
    const stars = []

    for (let i = 0; i < 5; i++) {
        if (i < avg) stars.push(fill)
        else stars.push(noFill)
    }


    // When the bookmark is filled
    const handleDelete = async (e) => {
        e.preventDefault();
        setBookMark(!bookMark)
        const response = await fetch(`/api/users/${id}/favorite`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        const message = await response.json();
        dispatch(authenticate())
    };

    // When the bookmark is unfilled
    const handleAdd = async (e) => {
        e.preventDefault();
        setBookMark(!bookMark)
        const response = await fetch(`/api/users/${id}/favorite`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        })
        const message = await response.json();
        dispatch(authenticate())
    };

    //Update the state of users
    useEffect(() => {
        dispatch(authenticate())
    }, [dispatch])

    if (!currentUser || !userBusinesses) {
        return null
    }
    return (
        <div>
            <ul className='user-favorites'>
                <li className='single-favorite' key={id}>
                    <div className='left-bar'>
                        <>
                            <NavLink key={name} to={`/biz/${id}`}>
                                <div className='favorite-img'>
                                    {preview_image ?
                                        <img className='favorites-image'
                                            src={preview_image}
                                            alt={name}
                                        /> :
                                        <p>No Image</p>
                                    }
                                </div>
                            </NavLink>
                        </>
                        <div id='info'>
                            <span id='name'>
                                <NavLink key={id} to={`/biz/${id}`}>{name}</NavLink>
                            </span>
                            <span id='review-info'>
                                {
                                    stars.map((star, i) => (
                                        <span key={i}>{star}</span>
                                    ))
                                }
                                <span id='num-reviews'>
                                    {`${num_reviews} reviews`}
                                </span>
                            </span>
                            <span id='address'>
                                <NavLink key={name} to={`/biz/${id}`}>
                                    {`${city}, ${state}`}
                                </NavLink>
                            </span>
                        </div>
                    </div>
                    <div className='right-bar'>
                        {bookMark ?
                            <button className='flags' onClick={handleDelete}>
                                <i className="fa-solid fa-bookmark"></i>
                            </button>
                            :
                            <button className='flags' onClick={handleAdd}>
                                <i className="fa-regular fa-bookmark"></i>
                            </button>}
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default FavoriteBusinesses