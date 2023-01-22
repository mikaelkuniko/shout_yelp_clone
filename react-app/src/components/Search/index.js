import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { businessSearch } from "../../store/businessReducer";
import './index.css'


const BusinessSearchPage = () => {
    const dispatch = useDispatch()

    let search = window.location.search

    useEffect(() => {
        dispatch(businessSearch(search))
    }, [dispatch, search])
    // console.log("SEARCH IN USE EFFECT", search)
    const businessesObj = useSelector(state=> state.businesses.allBusinesses)
    // console.log("BUSINESSESOBJ IN SEARCH", businessesObj)
    const businesses = Object.values(businessesObj)
    // console.log("BUSINESSES IN SEARCH", businesses)

    // let noFill = <i className="fa-solid fa-star stars noFill" />
    // let fill = <i className="fa-solid fa-star stars fill" />
    // const stars = []

    if(!businesses){
        return null
    }
    return (
        <div className="businesses-container">
            <ul>
                {businesses.map((business)=>(
                    <li style={{"listStyleType":"none", "margin":"1em"}}>
                        <Link className="businessCard" key={business.id} to={`/biz/${business.id}`}>
                            <div>
                                {business.images && <img className="bImage" src={business.images[0].url} alt='businessImage' />}
                            </div>
                            <div>
                                <h3>{business.name}</h3>
                                <h5>{business.num_reviews ? 'Rating: ' + (business.sum_rating / business.num_reviews).toFixed(2) : 'No reviews'}</h5>
                                {business.business_amenities.length ? business.business_amenities.map(amenity => (<span className="amenity">{amenity}</span>)) : <span className="amenity">No amenities</span>}
                            </div>


                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default BusinessSearchPage
