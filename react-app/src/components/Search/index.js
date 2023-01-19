import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessSearch } from "../../store/businessReducer";
import './index.css'


const BusinessSearchPage = () => {
    const dispatch = useDispatch()

    let search = window.location.search
    console.log('PATHNAME', window.location)

    useEffect(() => {
        dispatch(businessSearch(search))
    }, [search])
    const businessesObj = useSelector(state=> state.businesses.allBusinesses)
    console.log("BUSINESSESOBJ IN SEARCH", businessesObj)
    const businesses = Object.values(businessesObj)
    console.log("BUSINESSES IN SEARCH", businesses)

    if(!businesses){
        return null
    }
    return (
        <div className="businesses-container">
            <ul>
                {businesses.map((business)=>(
                    <li>
                        {`${business.name}`}
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default BusinessSearchPage
