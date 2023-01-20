import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import FavoriteBusinesses from './FavoriteBusinesses';

function UserFavorites() {

    const currentUser = useSelector(state => state.session.user)
    let userBusinesses = currentUser.user_businesses

    
    useEffect(() => {
        userBusinesses = currentUser.user_businesses
    }, [userBusinesses]) 
    
    if (!currentUser || !userBusinesses) {
        return null
    }

    return (
        <div>
            <ul>
                {userBusinesses.length ? userBusinesses.map((business) => (
                    <FavoriteBusinesses key={business.id} {...business}/>
                )) : <p>No Favorites</p>}
            </ul>
        </div>

    );
}
export default UserFavorites;