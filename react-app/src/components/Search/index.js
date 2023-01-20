import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { businessSearch } from "../../store/businessReducer";
import './index.css'


const BusinessSearchPage = () => {
    const dispatch = useDispatch()

    let search = window.location.search
<<<<<<< HEAD
=======
    // console.log('PATHNAME', window.location)
    let state = useSelector(state=> state)
    // console.log('STATE', state)
>>>>>>> 7ab2eacb8f0c2cb7b6fde588f3f36e1af2bfca50

    useEffect(() => {
        dispatch(businessSearch(search))
    }, [search])
    // console.log("SEARCH IN USE EFFECT", search)
    const businessesObj = useSelector(state=> state.businesses.allBusinesses)
    // console.log("BUSINESSESOBJ IN SEARCH", businessesObj)
    const businesses = Object.values(businessesObj)
    // console.log("BUSINESSES IN SEARCH", businesses)

    if(!businesses){
        return null
    }
    return (
        <div className="businesses-container">
            <ul>
                {businesses.map((business)=>(
                    <li>
                        <Link className="businessName" key={business.id} to={`/biz/${business.id}`}>
                            {`${business.name}`}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default BusinessSearchPage
