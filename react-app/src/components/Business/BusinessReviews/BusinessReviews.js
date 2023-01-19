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
    let noFill = <i className="fa-solid fa-star stars noFill" />
    let fill = <i className="fa-solid fa-star stars fill" />
    const stars = []

    for(let i = 0; i < 5; i++){
        console.log(review.id)
        if (i < review.stars) stars.push(fill)
        else stars.push(noFill)
    }


    if(!review) return null
    return (
        <div className='bizReview'>
            <div>
                <div className='userInfo'>
                    <h4>profile pic</h4>
                    <div>
                        <h4>User id: {review.user.id}</h4>
                        <h4>username</h4>
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
                <div>
                    <span>Useful: {review.useful} </span>
                    <span>Cool: {review.cool} </span>
                    <span>Funny: {review.funny}</span>
                </div>
            </div>
            <div>
                {currentUser && currentUser.id === review.user.id && (
                    <button onClick={deleteAReview}>Delete Review</button>
                )}
                {currentUser && currentUser.id === review.user.id && (
                    <Link to={`/biz/${review.business_id}/reviews/${review.id}/edit`}>Edit</Link>
                )}
            </div>
        </div>
    )
}

export default BusinessReviews
