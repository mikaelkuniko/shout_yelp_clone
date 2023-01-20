import { useParams, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneBusiness, deleteBusiness } from "../../store/businessReducer";
import './index.css'
import BusinessReviews from "./BusinessReviews/BusinessReviews";
import { authenticate } from '../../store/session';
import { allReviews } from "../../store/review";

const BusinessDetails = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const { businessId } = useParams()
    const [bookMark, setBookMark] = useState(false)

    const currentUser = useSelector(state => state.session.user)
    let  userBusinesses;

    if (currentUser) {
        userBusinesses = currentUser.user_businesses
    }


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

    // delete business
    const removeBusiness = async () => {
        console.log("BUSINESS ID",business.id)
        await dispatch(deleteBusiness(business.id))
        await dispatch(allReviews())
        history.push('/')
        alert('Business Deleted')
    }

    // edit business
    const editBusiness = () => {
        history.push(`/biz/${business.id}/edit`)
    }

    useEffect(()=>{
        dispatch(getOneBusiness(businessId))
    }, [dispatch, bizReviews.length, businessId])

    useEffect(() => {
        if(userBusinesses) {
            for(let i = 0; i < userBusinesses.length; i++) {
                if (Number(userBusinesses[i].id) === Number(businessId)) {
                    setBookMark(true)
                }
            }
        }
    }, [])

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
                { currentUser && (
                    <Link to={`/biz/${businessId}/writeareview`}>Write a Review</Link>
                )}
                { currentUser &&
                (<>
                    {bookMark ?
                        <button onClick={handleDelete}>
                            <i className="fa-solid fa-bookmark"></i>
                        </button>
                        :
                        <button onClick={handleAdd}>
                           <i className="fa-regular fa-bookmark"></i>
                        </button>
                    }
                </>)
                }
                { currentUser && currentUser.id === business.owner_id && (
                    <div>
                        <button onClick={removeBusiness}>Delete Business</button>
                        <button onClick={editBusiness}>Edit Business</button>
                    </div>
                )}
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
