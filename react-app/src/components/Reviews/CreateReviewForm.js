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

    const clearData = (newReview) => {
        setReview('')
        setStars('')
        setErrors([])

        history.push(`/biz/${newReview.business_id}`)
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


        console.log(payload)

        let newReview = await dispatch(reviewCreate(bizId, payload))
        // .then(createdReview => clearData(createdReview)).catch(
        //     async (res) => {
        //         const data = await res.json();
        //         if (data && data.errors) setErrors(data.errors);
        //     }); // change the bizId --------------------------------------------------
        console.log('IN THE FORM AFTER DISPATCH', newReview)


        if(newReview) clearData(newReview)
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
            <textarea style={{"borderRadius":"10px 10px 0px 0px"}}
                className='reviewText'
                type={'text'}
                placeholder={'Review'}
                required
                value={review}
                onChange={updateReview}
            />
            <input
                className='formChildren'
                type={'number'}
                placeholder={'Stars'}
                required
                min={1}
                max={5}
                value={stars}
                onChange={updateStars}
            />
            <input style={{"borderRadius":"0px 0px 10px 10px"}}
                className='formChildren'
                type={'url'}
                placeholder={'Image (optional)'}
                value={image}
                onChange={updateImage}
            />
            <button>Submit</button>
            </form>
        </div>
    )
}

export default CreateReviewForm
