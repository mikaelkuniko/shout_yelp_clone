import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as businessActions from '../../store/businessReducer'
import { useHistory, useParams } from "react-router-dom";
import './EditBusinessForm.css'

const EditBusinessForm = () => {
    let hours = []
    let createHours = () => {
        for (let i = 1; i < 13; i++) {
            hours.push(`${i}`)
        }
        return hours
    }
    createHours()

    let minutes = [':00', ':15', ':30', ':45']
    // let createMinutes = () => {
    //     for (let i = 0; i < 60; i++) {
    //         minutes.push(i)
    //     }
    //     return minutes
    // }
    // createMinutes()

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
    const [menuUrl, setMenuUrl] = useState('')
    const [openHours, setOpenHours] = useState('8')
    const [closeHours, setCloseHours] = useState('8')
    const [openMinutes, setOpenMinutes] = useState(':00')
    const [closeMinutes, setCloseMinutes] = useState(':00')
    const [openAMPM, setOpenAMPM] = useState('AM')
    const [closeAMPM, setCloseAMPM] = useState('PM')
    const [errors, setErrors] = useState([])
    const history = useHistory()
    const {bizId} = useParams()

    useEffect(()=> {
        // do the errors
        const errors = [];
        if(name.length === 0) errors.push("Business name must be inputted")
        if(description.length === 0) errors.push("Business description must be inputted")
        if(phoneNumber.length === 0) errors.push("Business phone number must be valid")
        if(businessUrl.length === 0) errors.push("Business website url must be inputted")
        if(address.length === 0) errors.push("Business address must be inputted")
        if(city.length === 0) errors.push("City must be inputted")
        if(state.length === 0) errors.push("State must be inputted")
        if(country.length === 0) errors.push("Country must be inputted")
        if(zipCode.length === 0) errors.push("Zipcode must be inputted")
        // if(previewImage.length == 0) errors.push("At least one preview image must be uploaded")
        if(openHours < 0 || openHours > 12) errors.push("Business hours must be valid")
        if(closeHours < 0 || closeHours > 12) errors.push("Business hours must be valid")
        if(openMinutes < 0 || openMinutes > 59) errors.push("Business hours must be valid")
        if(closeMinutes < 0 || closeMinutes > 59) errors.push("Business hours must be valid")
        if(openAMPM.length === 0) errors.push("Business hours must be valid")
        if(closeAMPM.length === 0) errors.push("Business hours must be valid")

        setErrors(errors);
    }, [name, description, phoneNumber, businessUrl, address, city, state, country, zipCode, openHours, openMinutes, openAMPM, closeHours, closeMinutes, closeAMPM])

    useEffect(()=>{

    }, [errors])

    useEffect(()=>{
        dispatch(businessActions.getOneBusiness(bizId))
            .then((res)=>{
                console.log('--------this is the response-------', res)
                setName(res.name)
                setDescription(res.description)
                setPhoneNumber(res.phone_number)
                setBusinessUrl(res.business_url)
                setAddress(res.address)
                setCity(res.city)
                setState(res.state)
                setCountry(res.country)
                setZipCode(res.zip_code)
                setPreviewImage(res.preview_image)
                setMenuUrl(res.menu_url)
                let openTime = res.open
                let openSplit = openTime.split(' ')
                let openHoursMins = openSplit[0].split(':')
                setOpenHours(openHoursMins[0])
                setOpenMinutes(':' + openHoursMins[1])
                setOpenAMPM(openSplit[1])
                let closeTime = res.close
                let closeSplit = closeTime.split(' ')
                let closeHoursMins = closeSplit[0].split(':')
                setCloseHours(closeHoursMins[0])
                setCloseMinutes(':' + closeHoursMins[1])
                setCloseAMPM(closeSplit[1])
                // setOpenHours(res.open_hours)
                // setOpenMinutes(res.open_minutes)
                // setOpenAMPM(res.open_AMPM)
                // setCloseHours(res.close_hours)
                // setCloseMinutes(res.close_minutes)
                // setCloseAMPM(res.close_AMPM)
            })
    }, [dispatch, bizId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            id: bizId,
            name,
            description,
            phone_number: phoneNumber,
            business_url: businessUrl,
            address,
            city,
            state,
            country,
            zip_code: zipCode,
            preview_image: previewImage,
            menu_url: menuUrl,
            open: `${openHours}${openMinutes} ${openAMPM}`,
            close: `${closeHours}${closeMinutes} ${closeAMPM}`,
            // open: openHours + ':' + openMinutes + ' ' + openAMPM,
            // close: closeHours + ':' + closeMinutes + ' ' +closeAMPM,
        }
        return dispatch(businessActions.updateBusiness(payload, bizId))
            .then(()=> history.push(`/biz/${bizId}`))

    }

    return (
        <div className='outerDiv'>
            <div className='edit-spot-div'>
                <h3 id ='add-business-text'>Edit Business</h3>
                <form onSubmit={handleSubmit} className='add-business-form'>
                    <div className='edit-business-inputs'>
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
                        <p>Business URL</p>
                        <label>
                        <input
                                type='url'
                                value={businessUrl}
                                onChange={(e)=> setBusinessUrl(e.target.value)}
                                required
                                placeholder='Business URL'
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
                                type='url'
                                value={previewImage}
                                onChange={(e)=> setPreviewImage(e.target.value)}
                                required
                                placeholder='Preview Image'
                                className='inputs'
                            />
                        </label>
                        <p>Menu Url</p>
                        <label>
                        <input
                                type='url'
                                value={menuUrl}
                                onChange={(e)=> setMenuUrl(e.target.value)}
                                required
                                placeholder='Menu Url'
                                className='inputs'
                            />
                        </label>
                        <div className='opening-times'>
                        <p>Opening hours</p>
                        <label>
                        <select onChange={(e)=>setOpenHours(e.target.value)} value={openHours}>
                            {hours.map(hour =>
                            <option key={hour}>{hour}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setOpenMinutes(e.target.value)} value={openMinutes}>
                            {minutes.map(minute =>
                            <option key={minute}>{minute}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setOpenAMPM(e.target.value)} value={openAMPM}>
                            {AMPM.map(amOrPm =>
                            <option key={amOrPm}>{amOrPm}</option>
                            )}
                        </select>
                        </label>
                        </div>
                        <div className='closing-times'>
                        <p>Closing hours</p>
                        <label>
                        <select onChange={(e)=>setCloseHours(e.target.value)} value={closeHours}>
                            {hours.map(hour =>
                            <option key={hour}>{hour}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setCloseMinutes(e.target.value)} value={closeMinutes}>
                            {minutes.map(minute =>
                            <option key={minute}>{minute}</option>
                            )}
                        </select>
                        <select onChange={(e)=>setCloseAMPM(e.target.value)} value={closeAMPM}>
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
                     <button id='edit-business-button' type="submit" disabled={!!errors.length}>Edit Business</button>
                </form>
            </div>
        </div>
    )

}

export default EditBusinessForm
