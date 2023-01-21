import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { authenticate } from '../../store/session';

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
            <li className='user-favorites' key={id}>
                <>
                    <NavLink key={name} to={`/biz/${id}`}>
                        <div>
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
                <>
                    <NavLink key={id} to={`/biz/${id}`}>{name}</NavLink>
                </>
                <>
                    <NavLink key={name} to={`/biz/${id}`}>
                        {`${city}, ${state}`}
                    </NavLink>
                    {bookMark ? 
                    <button onClick={handleDelete}>
                        <i className="fa-solid fa-bookmark"></i>
                    </button>
                    :
                    <button onClick={handleAdd}>
                        <i className="fa-regular fa-bookmark"></i>
                    </button>}
                </>
                <>
                    {`${city}, ${state}`}
                </>
            </li>
        </div>
    )
}

export default FavoriteBusinesses