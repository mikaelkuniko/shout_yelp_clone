import { useParams, Link, NavLink, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneBusiness } from "../../store/businessReducer";
import './index.css'

const BusinessDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { businessId } = useParams()
    console.log('BUSINESS ID FROM PARAMS', businessId)
    const business = useSelector((state)=> state.businesses.singleBusiness)
    console.log('BUSINESS FROM USE SELECTOR', business)
    const currentUser = useSelector((state)=> state.session.user)

    useEffect(()=>{
        dispatch(getOneBusiness(businessId))
    }, [dispatch])
    if(!business.name) return null
    else return (
        <div>
            <ul>
                <li>{business.name}</li>
                <li>{business.description}</li>
                <li>{business.phone_number}</li>
                <li>{business.city}</li>

            </ul>
        </div>
    )
}
export default BusinessDetails
