import { useState} from "react";
import { useHistory } from "react-router-dom";
import { businessSearch } from "../../store/businessReducer";
import { useDispatch } from "react-redux";



const SearchBar = () => {
    const[business, setBusiness] =useState("");
    const[location, setLocation] =useState("");
    const history = useHistory( )
    const dispatch = useDispatch()

    let pathname = window.location

    const handleSubmit = async(e) => {
        e.preventDefault()
        let newUrl = new URL(`${pathname.origin}${pathname.pathname}?business=${business}&location=${location}`)
        let searchParams = newUrl.search
        await dispatch(businessSearch(searchParams))
        history.push(`/biz/search${searchParams}`)
    }

    return (
        <div className='search-bar-form-container'>
            <form onSubmit={handleSubmit} className="search-form">
                <div>
                    <input
                        value={business}
                        type="text"
                        placeholder="Five Guys, Papa Johns, Etta..."
                        className="search-input"
                        onChange={(e)=> setBusiness(e.target.value)}/>
                </div>
                <div>
                    <input
                        value={location}
                        type="text"
                        placeholder="CA, TX, Baltimore..."
                        className="search-input"
                        onChange={(e)=> setLocation(e.target.value)}/>
                </div>
                <button type="submit" className="search-button">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
            </form>
        </div>
    )
}

export default SearchBar
