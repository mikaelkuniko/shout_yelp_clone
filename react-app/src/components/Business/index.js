import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneBusiness } from "../../store/businessReducer";
import './index.css'
import BusinessReviews from "./BusinessReviews/BusinessReviews";

const BusinessDetails = () => {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    // console.log('BUSINESS ID FROM PARAMS', businessId)
    const business = useSelector((state)=> state.businesses.singleBusiness)
    const totalReviews = Object.values(useSelector((state)=> state.reviews.allReviews))
    // console.log('BUSINESS FROM USE SELECTOR', business)

    const bizReviews = totalReviews.filter((review) => Number(businessId) === Number(review.business_id))

    useEffect(()=>{
        dispatch(getOneBusiness(businessId))
    }, [dispatch, bizReviews.length, businessId])
    if(!business.name) return null
    else return (
        <div className="photo-header">
            <div className="photo-content-container">

            </div>
            <div className="photo-carousel">
                <div className="carousel-image">
                    <img src={business.images[0].url}/>
                </div>

                <div className="carousel-image">
                    <img src={business.images[1].url}/>
                </div>

                <div className="carousel-image">
                    <img src={business.images[2].url}/>
                </div>

            </div>
            <ul>
                <li>{business.name}</li>
                <li>{business.description}</li>
                <li>{business.phone_number}</li>
                <li>{business.city}</li>
                <li>{business.review_avg}</li>
                {/* <li>Rating: {avgRating}</li> */}
                <Link to={`/biz/${businessId}/writeareview`}>Write a Review</Link>
                <div className="reviews">
                    {bizReviews.map((review) => (
                        <BusinessReviews key={review.id} {...review}/>
                    ))}
                </div>
            </ul>
        </div>
    )
}
export default BusinessDetails
