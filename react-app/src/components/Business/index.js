import { useParams, Link } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneBusiness } from "../../store/businessReducer";
import './index.css'
import BusinessReviews from "./BusinessReviews/BusinessReviews";
import { authenticate } from '../../store/session';

const BusinessDetails = () => {
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const [bookMark, setBookMark] = useState(false)

    const currentUser = useSelector(state => state.session.user)
    const userBusinesses = currentUser.user_businesses

    // console.log('BUSINESS ID FROM PARAMS', businessId)
    const business = useSelector((state)=> state.businesses.singleBusiness)
    const totalReviews = Object.values(useSelector((state)=> state.reviews.allReviews))
    // console.log('BUSINESS FROM USE SELECTOR', business)

    const bizReviews = totalReviews.filter((review) => Number(businessId) === Number(review.business_id))

     // When the bookmark is filled
     const handleDelete = async (e) => {
        e.preventDefault();
        setBookMark(!bookMark)
        const response = await fetch(`/api/users/${businessId}/favorite`, {
            method: 'DELETE',
            headers: { "Content-Type": "application/json" }
        })
        const message = await response.json();
        if(message) dispatch(authenticate())
    };

    // When the bookmark is unfilled
    const handleAdd = async (e) => {
        e.preventDefault();
        setBookMark(!bookMark)
        const response = await fetch(`/api/users/${businessId}/favorite`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" }
        })
        const message = await response.json();
        if(message) dispatch(authenticate())
    };

    useEffect(()=>{
        dispatch(getOneBusiness(businessId))
    }, [dispatch, bizReviews.length, businessId])

    useEffect(() => {
        for(let i = 0; i < userBusinesses.length - 1; i++) {
            if (Number(userBusinesses[i].id) === Number(businessId)) {
                setBookMark(true)
            }
        }
    }, [])

    if(!business.name) return null

    else return (
        <div>
            <ul>
                <li>{business.name}</li>
                <li>{business.description}</li>
                <li>{business.phone_number}</li>
                <li>{business.city}</li>
                <li>{business.review_avg}</li>
                {/* <li>Rating: {avgRating}</li> */}
                <Link to={`/biz/${businessId}/writeareview`}>Write a Review</Link>
                <>
                    {bookMark ? 
                        <button onClick={handleDelete}>
                            <i className="fa-solid fa-bookmark"></i>
                        </button>
                        :
                        <button onClick={handleAdd}>
                           <i className="fa-regular fa-bookmark"></i>
                        </button>
                    }
                </>
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
