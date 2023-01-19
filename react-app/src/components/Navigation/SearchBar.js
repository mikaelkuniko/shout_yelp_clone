import { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { businessSearch } from "../../store/businessReducer";



const SearchBar = () => {
    const[business, setBusiness] =useState("");
    const[location, setLocation] =useState("");
    const history = useHistory( )

    let pathname = window.location
    console.log("PATHNAME ORIGIN", window.location)
    // console.log("PATHNAME pathname", pathname.pathname)


    const handleSubmit = async(e) => {
        e.preventDefault()
         console.log("hello")
         let newUrl = new URL(`${pathname.origin}${pathname.pathname}?business=${business}&location=${location}`)
        let searchParams = newUrl.search
        history.push(`/biz/search${searchParams}`)
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={business}
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=> setBusiness(e.target.value)}/>
                <input
                    value={location}
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=> setLocation(e.target.value)}/>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default SearchBar
