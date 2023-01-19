import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { businessSearch } from "../../store/businessReducer";
import './index.css'


const BusinessSearchPage = () => {
    const businessesObj = useSelector(state=> state.businesses.allBusinesses)
    const businesses = Object.values(businessesObj)
    useEffect(() => {
        dispatchEvent(businessSearch())
    }, [dispatch])

    if(!businesses){
        return null
    }
    return (
        <div className="businesses-container">
            {businesses.map}
        </div>
    )

}
