import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReviewDetails from './ReviewDetails'
import './index.css'
import { businessSearch } from '../../store/businessReducer'
// import { allReviews } from '../../store/review'

function Reviews() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(businessSearch('?business=&location='))
    }, [dispatch])

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
