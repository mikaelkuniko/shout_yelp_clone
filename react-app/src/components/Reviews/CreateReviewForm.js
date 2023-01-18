import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { reviewCreate } from '../../store/review'
import './CreateReviewForm.css'

function CreateReviewForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [ review, setReview ] = useState('')
    const [ stars, setStars ] = useState('')
    const [ image, setImage ] = useState('')
    const [ errors, setErrors ] = useState([])

    const { bizId } = useParams()


    const updateReview = (e) => setReview(e.target.value)
    const updateStars = (e) => setStars(e.target.value)
    const updateImage = (e) => setImage(e.target.value)

    const clearData = (createdReview) => {
        setReview('')
        setStars('')
        setErrors([])

        // history.push(`/`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            review,
            stars,
            image
        }

        console.log(payload)

        // await dispatch(reviewCreate(bizId, review)).then(createdReview => clearData(createdReview)).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }); // change the bizId --------------------------------------------------
    }
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
                required
                value={image}
                onChange={updateImage}
            />
            <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateReviewForm
