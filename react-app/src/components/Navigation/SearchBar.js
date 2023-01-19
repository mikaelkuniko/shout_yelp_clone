import { useState } from "react";
import { useLocation } from "react-router-dom";


const SearchBar = () => {
    const[business, setBusiness] =useState("");
    const[location, setLocation] =useState("");

    // const urlParser = (searchparameters) => {
    //     let onlyKVpairs = searchparameters.slice(1)
    //     let splitOnAnd = onlyKVpairs.split('&')
    //     for(let pair of splitOnAnd){
    //         pair.split('=')
    //     }

    // }


    // const {pathname} = useLocation()
    let pathname = window.location.href
    console.log("SEARCH VARIABLE",  pathname)

    // let searchParams = new URLSearchParams(search)
    // console.log("SEARCH PARAMS", searchParams)
    // const businessUrl = searchParams.get('business')
    // console.log("BUSINESS URL", businessUrl)
    // const locationUrl = searchParams.get('location')
    // console.log("BUSINESS", business)
    const handleSubmit = async(e) => {
        e.preventDefault()
         console.log("hello")
         let newUrl = new URL(`${pathname}?business=${business}&location=${location}`)
        console.log("NEWURL", newUrl)
        // console.log("NEWURL ENTRIES", newUrl.entries())
        let searchParams = new URLSearchParams(newUrl.href)
        console.log('SEARCH PARAMS', searchParams)
    }
    let newUrl = new URLSearchParams({
        'business': 'biz',
        'location': 'loc'
     })
    // console.log("NEWURL", newUrl)
    // console.log("NEWURL ENTRIES", newUrl.entries())

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
