import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { reviewUpdate } from '../../../store/review'

function EditReviewForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const { reviewId } = useParams()
    const reviewData = useSelector(state => state.reviews.allReviews[reviewId])
    const user = useSelector(state => state.session.user)
    const [ review, setReview ] = useState(reviewData.review)
    const [ stars, setStars ] = useState(reviewData.stars)
    const [ image, setImage ] = useState(reviewData.images[0].url)
    const [ errors, setErrors ] = useState([])

    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)
    const updateImage = (e) => setImage(e.target.value)

    const clearData = (editedReview) => {
        setReview('')
        setStars('')
        setErrors([])

        history.push(`/biz/${editedReview.business_id}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let payload;
        if(image){
            payload= {
                review,
                stars,
                image
            }
        } else {
            payload= {
                review,
                stars
            }
        }

        let theReview = await dispatch(reviewUpdate(reviewData.id, payload))
        .then(createdReview => clearData(createdReview)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            }); // change the bizId --------------------------------------------------

        if(theReview) clearData(theReview)
    }


    if(user.id !== reviewData.user) history.push('/pageNotFound')
    return (
        <div className='reviewForm'>
            <form onSubmit={handleSubmit} className='reviewForm'>
            {errors.length !== 0 &&
                    <ul style={{"marginBottom":"0px"}}>
                    {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
            }
            <h4>Create a Review</h4>
            <input style={{"borderRadius":"10px 10px 0px 0px"}}
                type={'text'}
                placeholder={'Review'}
                required
                value={review}
                onChange={updateReview}
            />
            <input
                type={'number'}
                placeholder={'Stars'}
                required
                value={stars}
                onChange={updateStars}
            />
            <input style={{"borderRadius":"0px 0px 10px 10px"}}
                type={'url'}
                placeholder={'Image'}
                value={image}
                onChange={updateImage}
            />
            <button>Submit</button>
            </form>
        </div>
    )
}

export default EditReviewForm
