import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './ReviewDetails.css'

function ReviewDetails(review) {
    const n = review.stars
    let noFill = <i className="fa-solid fa-star stars noFill" />
    let fill = <i className="fa-solid fa-star stars fill" id={n === 5 ? 'five' : n === 3 ? 'three' : n === 2 ? 'two' : n === 1 ? 'one' : ''}/>
    const stars = []
    console.log('REVIEW IN REVIEW', review)
    const business = useSelector(state => state.businesses.allBusinesses[review.business_id])
    console.log('BUSINESS IN REVEIW', business)
    for(let i = 0; i < 5; i++){
        if (i < review.stars) stars.push(fill)
        else stars.push(noFill)
    }
    if(!review) return null
    return (
        <div className='reviewCard'>
            <Link className='gap' to={`/biz/${review.business_id}`}>
                <div className='userInfo'>
                    {review.user.profile_pic !== null ? <img src={review.user.profile_pic} alt='profile_pic' /> : <i className="fa-regular fa-user pic"></i> }
                    <div>
                        <h4 style={{"marginBottom":"4px"}}>{review.user.username}</h4>
                        <p id='reviewAction'>Wrote a review</p>
                    </div>
                </div>
                {business && <div className='bizName'>{business.name}</div>}
                <div className='reviewRating'>
                {stars.map((star, i) => (
                    <span key={i}>{star}</span>
                    ))}
                </div>
                <p className='reviewBody'>Review: {review.review}</p>
                {/* <div>
                    <span>Useful: {review.useful} </span>
                    <span>Cool: {review.cool} </span>
                    <span>Funny: {review.funny}</span>
                </div> */}
                {review.images.length ? (
                    <div className='reviewImages'>
                        <img style={{"height":"100px", "width":"100px"}} src={review.images[0].url} alt={'pic'}/>
                    </div>
                ) : (null)}
            </Link>
        </div>
    )
}

export default ReviewDetails
