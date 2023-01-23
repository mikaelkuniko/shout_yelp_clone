import { useParams, Link, useHistory } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getOneBusiness, deleteBusiness } from "../../store/businessReducer";
import './index.css'
import BusinessReviews from "./BusinessReviews/BusinessReviews";
import { authenticate } from '../../store/session';
import { allReviews } from "../../store/review";
import BusinessPageHeader from "./BusinessReviews/BusinessPageHeader";

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
        // console.log("BUSINESS ID",business.id)
        await dispatch(deleteBusiness(business.id))
        await dispatch(allReviews())
        await dispatch(authenticate())
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
    }, [businessId, userBusinesses])

    if(!business.name) return null

    else return (
        <>
            <BusinessPageHeader/>
                <div className="business-page-body">
                    <div className="business-user-crud">
                        {/* <li>Rating: {avgRating}</li> */}
                        { currentUser && (
                            <Link className="writeReview" to={`/biz/${businessId}/writeareview`}><i className="fa-regular fa-star"></i><span style={{"paddingLeft":"5px", "position":"relative", "top":"2px"}}>Write a Review</span></Link>
                        )}
                        { currentUser &&
                        (<>
                            {bookMark ?
                                <button className="saved" onClick={handleDelete}>
                                    <i className="fa-solid fa-bookmark"></i> Saved
                                </button>
                                :
                                <button className="notSaved" onClick={handleAdd}>
                                <i className="fa-regular fa-bookmark"></i> Save
                                </button>
                            }
                        </>)
                        }
                        { currentUser && currentUser.id === business.owner_id && (
                            <div className="owner-crud-container">
                                <button onClick={removeBusiness} className="owner-crud">Delete Business</button>
                                <button onClick={editBusiness} className="owner-crud">Edit Business</button>
                            </div>
                        )}
                    </div>
                    {(business.menu_url)&&
                    <div className="body-element-container">
                          <div className="menu-header">
                            <h2>Menu</h2>
                          </div>
                          <div className="menu-link-container">
                            <a href={business.menu_url}>Website Menu</a>
                          </div>
                    </div>
                    }
                    {(business.business_amenities)&&
                    <div className="body-element-container">
                        <div className="ammenities-header">
                            <h2>Ammenities and More</h2>
                        </div>
                        <div className="ammenities-content">
                            {business.business_amenities.map((amenity) =>(
                                <div className="ammenity-container">
                                    <div className="ammenity-check">
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                    <div className="ammenity">
                                        {amenity}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                    <div className="reviews">
                        {bizReviews.map((review) => (
                            <BusinessReviews key={review.id} {...review}/>
                        ))}
                    </div>
                </div>
    </>
    )
}
export default BusinessDetails
