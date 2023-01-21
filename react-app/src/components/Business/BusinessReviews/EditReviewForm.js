import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { reviewUpdate } from '../../../store/review'
import './EditReviewForm.css'

function EditReviewForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { bizId, reviewId } = useParams()
    const reviewData = useSelector(state => state.reviews.allReviews[reviewId])
    const user = useSelector(state => state.session.user)
    const [ review, setReview ] = useState(reviewData.review)
    const [ stars, setStars ] = useState(reviewData.stars)
    const [ errors, setErrors ] = useState([])

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)

    useEffect(() => {
        const errors = []
        if(stars > 5 || stars < 1) errors.push("Stars must be between 1 and 5")
        if(!review.length) errors.push("Review is required")
        setErrors(errors)
    }, [stars, review])

    const clearData = (editedReview) => {
        setReview('')
        setStars('')
        setErrors([])

        history.push(`/biz/${editedReview.business_id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()



        let payload= {
            review,
            stars,
        }


        let theReview = await dispatch(reviewUpdate(reviewData.id, payload))
        // .then(createdReview => clearData(createdReview)).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }); // change the bizId --------------------------------------------------

        if(theReview) clearData(theReview)
    }


    if(user.id !== reviewData.user.id) history.push('/pageNotFound')
    return (
        <div className='reviewForm'>
            <button onClick={() => history.push(`/biz/${bizId}`)} style={{"padding":"0px", "height":"0px", "color":"black", "width":"20px", "position":"relative", "right":"195px", "top":"15px", "border":"none", "background":"none", "cursor":"pointer"}}>X</button>
            <form onSubmit={handleSubmit} className='reviewCreateContainer'>
            <div>
                <h4 className={!errors.length ? 'reviewFormHeader' : ''}>Edit your Review</h4>
            </div>
            {errors.length !== 0 &&
                    <ul style={{"marginBottom":"0px"}}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
            }
            <textarea style={{"borderRadius":"10px 10px 0px 0px"}}
                className='reviewText'
                placeholder={'Review'}
                required
                value={review}
                onChange={updateReview}
            />
            <input style={{"borderRadius":"0px 0px 10px 10px"}}
            className='formChildren'
                type={'number'}
                placeholder={'Stars'}
                required
                min={1}
                max={5}
                value={stars}
                onChange={updateStars}
            />
            <button className='reviewSubmit'>Submit</button>
            </form>
        </div>
    )
}

export default EditReviewForm
