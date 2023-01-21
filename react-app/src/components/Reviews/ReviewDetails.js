import React from 'react'
import { Link } from 'react-router-dom'
import './ReviewDetails.css'

function ReviewDetails(review) {
    let noFill = <i className="fa-solid fa-star stars noFill" />
    let fill = <i className="fa-solid fa-star stars fill" />
    const stars = []

    for(let i = 0; i < 5; i++){
        if (i < review.stars) stars.push(fill)
        else stars.push(noFill)
    }
    if(!review) return null
    return (
        <div className='reviewCard'>
            <Link to={`/biz/${review.business_id}`}>
                <div className='userInfo'>
                    {review.user.profile_pic !== null ? <img src={review.user.profile_pic} alt='profile_pic' /> : <i className="fa-regular fa-user pic"></i> }
                    <div>
                        <h4>{review.user.username}</h4>
                    </div>
                </div>
                <div className='reviewRating'>
                {stars.map((star, i) => (
                    <span key={i}>{star}</span>
                    ))}
                </div>
                <p className='reviewBody'>Review: {review.review}</p>
                <div>
                    <span>Useful: {review.useful} </span>
                    <span>Cool: {review.cool} </span>
                    <span>Funny: {review.funny}</span>
                </div>
                {review.images.length ? (
                    <div style={{"display":"flex", "alignItems":"center"}}>
                        <img style={{"height":"100px", "width":"100px"}} src={review.images[0].url} alt={'pic'}/>
                    </div>
                ) : (null)}
            </Link>
        </div>
    )
}

export default ReviewDetails
