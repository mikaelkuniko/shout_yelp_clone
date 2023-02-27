import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useModal } from '../../../context/Modal'
import { getOneBusiness } from '../../../store/businessReducer'
import './DeleteImage.css'

function DeleteImage() {
    const dispatch = useDispatch()
    const [ selectedImages, setSelectedImages ] = useState([])
    const { closeModal } = useModal()
    const business = useSelector(state => state.businesses.singleBusiness)

    const handleSubmit = async (e) => {
        e.preventDefault()

        selectedImages.map(async (imageId) => {
            console.log('inselected', imageId)
            await fetch(`/api/biz/${business.id}/images/${imageId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                    },
                body: JSON.stringify(imageId)
            }).then(() => dispatch(getOneBusiness(business.id)))
            .then(closeModal)
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4>Select the images you want to delete</h4>
                <div className='deleteImagesContainer'>
                    {Object.values(business.images).map((image, i) => {
                        if(image.url) {
                            return (
                                <label key={i} className='imageLabels'>
                                    <img alt={i} className="imageSelect" src={image.url} />
                                    <input
                                        className='radio'
                                        type="checkbox"
                                        name="pictures"
                                        value={image.id}
                                        onChange={() => {
                                            if(selectedImages.includes(image.id)) {
                                                const index = selectedImages.indexOf(image.id)
                                                selectedImages.splice(index, 1)
                                                setSelectedImages(selectedImages)
                                            } else {
                                                selectedImages.push(image.id)
                                            }
                                        }}
                                    />
                                </label>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
                <button  className='reviewSubmit' onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default DeleteImage
