import { useState } from "react";
import { useLocation } from "react-router";


const SearchBar = () => {
    const[business, setBusiness] =useState("");
    const[location, setLocation] =useState("");

    const newUrl = new URLSearchParams()

    const {search} = useLocation()

    const searchParams = new URLSearchParams(search)
    const businessUrl = searchParams.get('business')
    const locationUrl = searchParams.get('location')
    const handleSubmit = async(e) => {
        e.preventDefault()
         console.log("hello")
         newUrl.append("business", business)
         newUrl.append("location", location)
        // searchParams.append("business", business)
        // searchParams.append("location", location)
        console.log("NEWURL", newUrl)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    value={businessUrl}
                    type="text"
                    placeholder="Search..."
                    onChange={(e)=> setBusiness(e.target.value)}/>
                <input
                    value={locationUrl}
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
