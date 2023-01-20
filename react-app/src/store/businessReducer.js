const LOAD = 'bizes/LOAD'
const CREATE = 'bizes/CREATE'
const DELETE = 'bizes/DELETE'
const GET_ONE = 'bizes/GET_ONE'
const CREATE_IMG = 'bizes/image/CREATE'

const load = businesses => ({
    type: LOAD,
    businesses
})

const create = business => ({
    type: CREATE,
    business
})

const createImage = image => ({
    type: CREATE,
    image
})

const getOne = business => ({
    type: GET_ONE,
    business
})

const remove = businessId => ({
    type: DELETE,
    businessId
})

export const getOneBusiness = (id) => async dispatch => {
    const response = await fetch(`/api/biz/${id}`);
    if (response.ok){
        const businessObj = await response.json();
        const business = businessObj.business
        console.log('BUSINESS IN THUNK', business)
        dispatch(getOne(business))
        return business
    }
    return response
}

export const businessSearch = (params) => async dispatch => {
    console.log('PARAMS IN THUNK', params)
    const response = await fetch(`/api/biz/search${params}`)
    if (response.ok){
        const searchResultsObj = await response.json();
        console.log('RESPONSE', searchResultsObj)
        const searchResults = searchResultsObj.businesses
        dispatch(load(searchResults))
        return searchResults
    }
    return response
}

export const addBusiness = (newBiz, bizImage) => async dispatch => {
    const response = await fetch(`/api/biz/new`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newBiz)
    });
    console.log('this is newBiz', newBiz)
    console.log('this is newBiz response', response)
    console.log('this is bizImage', bizImage)

    if(response.ok){
        const newBiz = await response.json();
        const {image_url} = bizImage
        let newBizImage = {
            business_id: newBiz.id,
            image_url
        }
        const newImageResponse = await fetch(`/api/biz/${newBiz.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newBizImage)
        })
        if(newImageResponse.ok){
            const newImage = await newImageResponse.json();
            dispatch(create(newBiz));
            dispatch(createImage(newImage))
            return newBiz
        }
    }

}




const initialState = {allBusinesses: {}, singleBusiness: {}}

const businessReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD:{
            newState = {...state, allBusinesses: {...state.allBusinesses}, singleBusiness:{...state.singleBusiness}}
            let business2={}
            console.log('ACTION.BUSINESSES', action.businesses)
            action.businesses.forEach(business => {
                business2[business.id] = business
            });
            newState.allBusinesses = business2
            return newState

        }
        case GET_ONE: {
            newState = {
                ...state,
                allBusinesses: {...state.allBusinesses},
                singleBusiness: {}
            }
            newState.singleBusiness = action.business
            return newState
        }
        case CREATE: {
            newState = {...state}
            console.log('this is the business that was created', action.business)
            let newAllBusinesses = {...state.allBusinesses, [action.business.id]: action.business}
            // new all businesses may be incorrect
            newState.allBusinesses = newAllBusinesses
            return newState
        }
        default:
            return state
    }
}

export default businessReducer
