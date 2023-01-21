import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../../store/session';
import './index.css'

function FavoriteBusinesses({ id, name, city, state, preview_image, num_reviews, sum_rating }) {
    const dispatch = useDispatch()
    const [bookMark, setBookMark] = useState(true)

    const currentUser = useSelector(state => state.session.user)
    const userBusinesses = currentUser.user_businesses


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
                    </div>
                    <div className='middle-bar'>
                        <>
                            <NavLink key={id} to={`/biz/${id}`}>{name}</NavLink>
                        </>
                        <>
                            {`${sum_rating} ${num_reviews}`}
                        </>
                        <>
                            <NavLink key={name} to={`/biz/${id}`}>
                                {`${city}, ${state}`}
                            </NavLink>
                        </>
                    </div>
                    <div className='right-bar'>
                        {bookMark ?
                            <button onClick={handleDelete}>
                                <i className="fa-solid fa-bookmark"></i>
                            </button>
                            :
                            <button onClick={handleAdd}>
                                <i className="fa-regular fa-bookmark"></i>
                            </button>}
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default FavoriteBusinesses