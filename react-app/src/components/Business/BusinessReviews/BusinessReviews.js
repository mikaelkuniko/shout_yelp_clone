import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeReview } from '../../../store/review'
import './BusinessReviews.css'

function BusinessReviews(review) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const deleteAReview = async () => {
        await dispatch(removeReview(review.id, review.spotId))
    }
    const n = review.stars
    let noFill = <i className="fa-solid fa-star stars noFill" />
    let fill = <i className="fa-solid fa-star stars fill" id={n === 5 ? 'five' : n === 3 ? 'three' : n === 2 ? 'two' : n === 1 ? 'one' : ''}/>
    const stars = []

    for(let i = 0; i < 5; i++){
        if (i < review.stars) stars.push(fill)
        else stars.push(noFill)
    }


    if(!review) return null
    return (
        <div className='bizReview'>
            <div>
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
                <p>{review.review}</p>
                {review.images.length ? (
                    <div style={{"display":"flex", "alignItems":"center"}}>
                        <img style={{"height":"100px", "width":"100px"}} src={review.images[0].url} alt={'pic'}/>
                    </div>
                ) : (null)}
                {/* <div>
                    <span>Useful: {review.useful} </span>
                    <span>Cool: {review.cool} </span>
                    <span>Funny: {review.funny}</span>
                </div> */}
            </div>
            <div className='reviewButtons'>
                {currentUser && currentUser.id === review.user.id && (
                    <button className='deleteTheReview' onClick={deleteAReview}>Delete Review</button>
                )}
                {currentUser && currentUser.id === review.user.id && (
                    <Link id='editReview' to={`/biz/${review.business_id}/reviews/${review.id}/edit`}>Edit</Link>
                )}
            </div>
        </div>
    )
}

export default BusinessReviews
