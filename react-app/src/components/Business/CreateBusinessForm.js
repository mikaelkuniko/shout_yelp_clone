import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/businessReducer'
import { useHistory } from "react-router-dom";
import './CreateBusinessForm.css'

const AddBusinessForm = () => {
    let hours = []
    let createHours = () => {
        for (let i = 1; i < 13; i++) {
            hours.push(i)
        }
        return hours
    }
    createHours()

    let minutes = []
    let createMinutes = () => {
        for (let i = 1; i < 60; i++) {
            minutes.push(i)
        }
        return minutes
    }
    createMinutes()

    const AMPM = ['AM', 'PM']

    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [businessUrl, setBusinessUrl] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [previewImage, setPreviewImage] = useState('')
    const [openHours, setOpenHours] = useState('')
    const [closeHours, setCloseHours] = useState('')
    const [openMinutes, setOpenMinutes] = useState('')
    const [closeMinutes, setCloseMinutes] = useState('')
    const [openAMPM, setOpenAMPM] = useState('')
    const [closeAMPM, setCloseAMPM] = useState('')
    const [errors, setErrors] = useState([])
    const history = useHistory()

    useEffect(()=> {
        // do the errors
        const errors = [];
        if(name.length == 0) errors.push("Business name must be inputted")
        if(description.length == 0) errors.push("Business description must be inputted")
        if(phoneNumber.length == 0) errors.push("Business phone number must be valid")
        if(businessUrl.length == 0) errors.push("Business website url must be inputted")
        if(address.length == 0) errors.push("Business address must be inputted")
        if(city.length == 0) errors.push("City must be inputted")
        if(state.length == 0) errors.push("State must be inputted")
        if(country.length == 0) errors.push("Country must be inputted")
        if(zipCode.length == 0) errors.push("Zipcode must be inputted")
        if(previewImage.length == 0) errors.push("At least one preview image must be uploaded")
        if(openHours < 0 || openHours > 12) errors.push("Business hours must be valid")
        if(closeHours < 0 || closeHours > 12) errors.push("Business hours must be valid")
        if(openMinutes < 0 || openMinutes > 59) errors.push("Business hours must be valid")
        if(closeMinutes < 0 || closeMinutes > 59) errors.push("Business hours must be valid")
        if(openAMPM.length == 0) errors.push("Business hours must be valid")
        if(closeAMPM.length == 0) errors.push("Business hours must be valid")

        setErrors(errors);
    }, [name, description, phoneNumber, businessUrl, address, city, state, country, zipCode, open, close])

    useEffect(()=>{

    }, [errors])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            name,
            description,
            phoneNumber,
            businessUrl,
            address,
            city,
            state,
            country,
            zipCode,
            previewImage,
            open: `${openHours}:${openMinutes} ${openAMPM}`,
            close: `${closeHours}:${closeMinutes} ${closeAMPM}`,
        }
        // unfinished
    }

    return (
        <div className='outerDiv'>
            <div className='add-spot-div'>
                <h3 id ='add-business-text'>Add Business</h3>
                <form onSubmit={handleSubmit} className='add-business-form'>
                    <div className='add-business-inputs'>
                        <p>Name</p>
                        <label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e)=> setName(e.target.value)}
                                required
                                placeholder='Name'
                                className='inputs'
                            />
                        </label>
                        <p>Description</p>
                        <label>
                            <textarea
                                type='text'
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}
                                required
                                placeholder='Description'
                                className='inputs'
                            />
                        </label>
                        <p>Phone Number</p>
                        <label>
                        <input
                                type='text'
                                value={phoneNumber}
                                onChange={(e)=> setPhoneNumber(e.target.value)}
                                required
                                placeholder='Phone Number'
                                className='inputs'
                            />
                        </label>
                        <p>Business Url</p>
                        <label>
                        <input
                                type='text'
                                value={businessUrl}
                                onChange={(e)=> setBusinessUrl(e.target.value)}
                                required
                                placeholder='Business Url'
                                className='inputs'
                            />
                        </label>
                        <p>Address</p>
                        <label>
                        <input
                                type='text'
                                value={address}
                                onChange={(e)=> setAddress(e.target.value)}
                                required
                                placeholder='Address'
                                className='inputs'
                            />
                        </label>
                        <p>City</p>
                        <label>
                        <input
                                type='text'
                                value={city}
                                onChange={(e)=> setCity(e.target.value)}
                                required
                                placeholder='City'
                                className='inputs'
                            />
                        </label>
                        <p>State</p>
                        <label>
                        <input
                                type='text'
                                value={state}
                                onChange={(e)=> setState(e.target.value)}
                                required
                                placeholder='State'
                                className='inputs'
                            />
                        </label>
                        <p>Country</p>
                        <label>
                        <input
                                type='text'
                                value={country}
                                onChange={(e)=> setCountry(e.target.value)}
                                required
                                placeholder='Country'
                                className='inputs'
                            />
                        </label>
                        <p>Zipcode</p>
                        <label>
                        <input
                                type='text'
                                value={zipCode}
                                onChange={(e)=> setZipCode(e.target.value)}
                                required
                                placeholder='Zipcode'
                                className='inputs'
                            />
                        </label>
                        <p>Preview Image</p>
                        <label>
                        <input
                                type='text'
                                value={previewImage}
                                onChange={(e)=> setPreviewImage(e.target.value)}
                                required
                                placeholder='Preview Image'
                                className='inputs'
                            />
                        </label>
                        <div className='opening-times'>
                        <p>Opening hours</p>
                        <label>
                        <select onChange={(e)=>setOpenHours} value={openHours}>
                            {hours.map(hour =>
                            <option key={hour}>{hour}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setOpenMinutes} value={openMinutes}>
                            {minutes.map(minute =>
                            <option key={minute}>{minute}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setOpenAMPM} value={openAMPM}>
                            {AMPM.map(amOrPm =>
                            <option key={amOrPm}>{amOrPm}</option>
                            )}
                        </select>
                        </label>
                        </div>
                        <div className='closing-times'>
                        <p>Closing hours</p>
                        <label>
                        <select onChange={(e)=>setCloseHours} value={closeHours}>
                            {hours.map(hour =>
                            <option key={hour}>{hour}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setCloseMinutes} value={closeMinutes}>
                            {minutes.map(minute =>
                            <option key={minute}>{minute}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setCloseAMPM} value={closeAMPM}>
                            {AMPM.map(amOrPm =>
                            <option key={amOrPm}>{amOrPm}</option>
                            )}
                        </select>
                        </label>
                        </div>
                    </div>
                    {!!errors.length && (
                        <div>
                            The following errors were found:
                            <ul className='errors'>
                                {errors.map((error) => (
                                    <li key={error}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                     <button id='add-business-button' type="submit" disabled={!!errors.length}>Add Business</button>
                </form>
            </div>
        </div>
    )

}

export default AddBusinessForm