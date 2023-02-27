import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useModal } from '../../../context/Modal'
import { getOneBusiness } from '../../../store/businessReducer'
import './CreateImage.css'

function CreateImage({businessId}) {
    const dispatch = useDispatch()
    const [ imageUrl, setImageUrl ] = useState('')
    const { closeModal } = useModal()

    const updateImageUrl = (e) => setImageUrl(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            business_id: businessId,
            url: imageUrl,

        }
        console.log(payload)

        await fetch(`/api/biz/${businessId}/images`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
                },
            body: JSON.stringify(payload)
        })
        .then(() => dispatch(getOneBusiness(businessId))).then(closeModal)
    }
    return (
        <div>
            <form  className='createImageContainer' onSubmit={handleSubmit}>
                <h4>Add an Image</h4>
                <div style={{"display":"flex","flexDirection":"column"}}>
                    <label>Image</label>
                    <input
                    type={'url'}
                    value={imageUrl}
                    className='createImageInput'
                    onChange={updateImageUrl}
                    placeholder='Enter an image url'
                    required
                    />
                </div>
                <button className='reviewSubmit'>Create image</button>
            </form>
        </div>
    )
}

export default CreateImage
