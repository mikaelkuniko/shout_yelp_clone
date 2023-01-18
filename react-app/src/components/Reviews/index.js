import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { allReviews } from '../../store/review'
import ReviewDetails from './ReviewDetails'


function Review() {
    stateReviews = useSelector(state => state.session.reviews)
    if(!stateReviews === undefined) return null

    reviews = Object.values(stateReviews)

    return (
        <div>
            {reviews.map((review) => (
                <ReviewDetails key={review.id} {...review} />
            ))}
        </div>
    )
    }

export default Review
