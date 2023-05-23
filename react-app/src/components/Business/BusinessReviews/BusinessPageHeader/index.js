import { useParams} from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOneBusiness} from "../../../../store/businessReducer"
import './index.css'

const BusinessPageHeader = () => {
    const dispatch = useDispatch()
    const { businessId } = useParams()

    // const currentUser = useSelector(state => state.session.user)
    // let userBusinesses = ''

    // if (currentUser) {
    //     userBusinesses = currentUser.user_businesses
    // }


         // console.log('BUSINESS ID FROM PARAMS', businessId)
    const business = useSelector((state)=> state.businesses.singleBusiness)


    const starsFunction =()=>{
        // requires fill and noFill classes in html and css to function
        const stars = []
        let noFill = <i className="fa-solid fa-star stars noFill" />
        let fill = <i className="fa-solid fa-star stars fill" />
        let reviewAggr = business.sum_rating/business.num_reviews
        for(let i = 0; i < 5; i++){
            if (i < reviewAggr) stars.push(fill)
            else stars.push(noFill)
        }
        return stars
    }
    const stars = starsFunction()




    useEffect(()=>{
        dispatch(getOneBusiness(businessId))
    }, [dispatch, businessId])

    if(!business.name) return null

    else return (
        <div className="photo-header">
            <div className="photo--business-content-container">
                <div className="business-content-container">
                    <div className="business-content">
                        <div className="business-content-header">
                            <div className="business-name">
                                <h1>{business.name}</h1>
                            </div>
                            <div className="business-review-container">
                                <div className='reviewRating'>
                                    {stars.map((star, i) => (
                                         <span key={i}>{star}</span>
                                        ))}
                              </div>
                              <div className="review-info">
                                    {(business.num_reviews === 1)&&
                                   <span>{business.num_reviews} review</span>
                                    }
                                    {(business.num_reviews > 1)&&
                                   <span>{business.num_reviews} reviews</span>
                                    }
                              </div>
                            </div>
                            <div className="upper-header-details">
                                {(business.business_types[0])&&
                                    <span key='0'>{business.business_types[0]}, </span>
                                }
                                {(business.business_amenities[0])&&
                                    <span key='1'>{business.business_amenities[0]}</span>
                                }

                            </div>
                            <div className="lower-header-details">
                                <span>{business.open} - {business.close}</span>
                            </div>
                        </div>
                        <div className="see-all-photos">
                        </div>
                    </div>
                </div>
            </div>
            <div className="photo-carousel">
                { business.images && business.images.slice(0,3).map((image, index) => (
                    <div>
                        <img className="carousel-image" src={image.url} key={index} alt='carousel'/>
                    </div>
                ))}
            </div>
        </div>
    )}

    export default BusinessPageHeader
