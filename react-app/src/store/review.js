
const CREATE = 'reviews/CREATE'
const ALL = 'reviews/ALL'
const USER = 'reviews/USER'
const UPDATE = 'reviews/UPDATE'
const DELETE = 'reviews/DELETE'

const createReview = (review) => {
    return {
        type: CREATE,
        review
    }
}

const loadAllReviews = (reviews) => {
    return {
        type: ALL,
        reviews
    }
}

const loadUserReviews = (reviews) => {
    return {
        type: USER,
        reviews
    }
}

const updateReview = (review) => {
    return {
        type: UPDATE,
        review
    }
}

const deleteReview = (reviewId) => {
    return {
        type: DELETE,
        reviewId
    }
}

export const reviewCreate = (bizId, review) => async dispatch => {
    const response = await fetch(`/api/biz/${bizId}/reviews`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
      })

      if(response.ok){
        const review = await response.json()
        dispatch(createReview(review))
      }
}


export const userReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews/current`)

    if(response.ok){
        const reviews = await response.json()
        dispatch(loadUserReviews(reviews))
        return reviews
    }
}

export const allReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`)

    if(response.ok){
        const reviews = await response.json()
        dispatch(loadAllReviews(reviews))
    }
}

export const reviewUpdate = (review) => async dispatch => {
    const response = await fetch(`/api/reviews/${review.id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(review)
      })

    if(response.ok){
        const review = await response.json()
        dispatch(updateReview(review))
    }
}

export const removeReview = (reviewId, bizId) => async dispatch => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {"Content-Type": "application/json"}
      })

    if(response.ok) {
        const review = await response.json()
        dispatch(deleteReview(reviewId))
        return review
    }
}

const initialState = { allReviews: {}, user: {} }

export default function reducer (state = initialState, action) {
    let newState;
    switch(action.type) {
        case CREATE:
            console.log("IN REDUCER CREATE", action)
            newState = {...state, allReviews: {...state.allReviews}, user: {...state.user}}
            newState.user[action.review.id] = action.review
            newState.allReviews[action.review.id] = action.review
            return newState
        case ALL:
            newState = {...state, allReviews: {...state.allReviews}, user: {...state.user}}
            action.reviews.Reviews.forEach(review => {
                newState.allReviews[review.id] = review
            });
            return newState
        case USER:
            newState = {...state, user: {...state.user}}
            action.reviews.userReviews.forEach(review => {
                newState.user[review.id] = review
            });
            return newState
        case UPDATE:
            return {...state, allReviews: {...state.allReviews, [action.review.id]: action.review}}
        case DELETE:
            newState = {allReviews: {...state.allReviews}, user: {...state.user}}
            if(newState.user[action.reviewId]) delete newState.user[action.reviewId]
            if(newState.allReviews[action.reviewId]) delete newState.allReviews[action.reviewId]
            return newState
        default:
            return state
    }
}
