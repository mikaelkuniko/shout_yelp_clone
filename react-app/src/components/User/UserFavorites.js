import React from 'react';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import FavoriteBusinesses from './FavoriteBusinesses';
import './index.css'

function UserFavorites() {

    const currentUser = useSelector(state => state.session.user)
    let userBusinesses = currentUser.user_businesses


    // useEffect(() => {
    //     userBusinesses = currentUser.user_businesses
    // }, [userBusinesses])

    if (!currentUser || !userBusinesses) {
        return null
    }

    return (
        <div>
            <h1 id='bookmark-header'>My Bookmarks</h1>
            <div id='user-info'>
                {currentUser.profile_pic !== null ? <img src={currentUser.profile_pic} alt='profile_pic' /> : <i className="fa-regular fa-user"></i>}
                <h4>{currentUser.username}</h4>
            </div>
            <ul>
                {userBusinesses.length ? userBusinesses.map((business) => (
                    <FavoriteBusinesses key={business.id} {...business} />
                )) : <h3 id='no-fav'>No Bookmarks...</h3>}
            </ul>
        </div>

    );
}
export default UserFavorites;
