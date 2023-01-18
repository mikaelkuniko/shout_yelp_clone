import React from 'react'
import { useSelector } from 'react-redux'
import ReviewDetails from './ReviewDetails'
import './index.css'

function Reviews() {
    const totalReviews = useSelector(state => state.reviews.allReviews)

    const reviews = Object.values(totalReviews)

    return (
        <div className='reviewsContainer'>
            {reviews.map((review) => (
                <ReviewDetails key={review.id} {...review} />
            ))}
        </div>
    )
}

export default Reviews
