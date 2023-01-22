import React from 'react'
import { useSelector } from 'react-redux'
import ReviewDetails from './ReviewDetails'
import './index.css'
// import { allReviews } from '../../store/review'

function Reviews() {

    const totalReviews = useSelector(state => state.reviews.allReviews)

    const reviews = Object.values(totalReviews)

    return (
        <div className='recent-activities'>
            <h1 id='recent-act-text'> Recent Activity </h1>
        <div className='reviewsContainer'>
            {reviews.map((review) => (
                <ReviewDetails key={review.id} {...review} />
            ))}
        </div>
        </div>
    )
}

export default Reviews
