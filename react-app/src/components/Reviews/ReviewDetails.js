import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './ReviewDetails.css'
import { removeReview } from '../../store/review'

function ReviewDetails(review) {
    const dispatch = useDispatch()
    const currentUser = useSelector(state => state.session.user)

    const deleteAReview = async () => {
        await dispatch(removeReview(review.id, review.spotId))
    }

    if(!review) return null
    return (
        <div className='reviewCard'>
            <Link to={`/biz/${review.business_id}`}>
                <h4>User id: {review.user} --------- Stars: {review.stars}</h4>
                <p>Review: {review.review}</p>
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
            <div>
                {currentUser && currentUser.id === review.user && (
                    <button onClick={deleteAReview}>Delete Review</button>
                )}
            </div>
        </div>
    )
}

export default ReviewDetails
