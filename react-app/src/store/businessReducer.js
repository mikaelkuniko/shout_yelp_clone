const LOAD = 'bizes/LOAD'
const CREATE = 'bizes/CREATE'
const UPDATE = 'bizes/UPDATE'
const DELETE = 'bizes/DELETE'
const GET_ONE = 'bizes/GET_ONE'

const load = businesses => ({
    type: LOAD,
    businesses
})

const create = business => ({
    type: CREATE,
    business
})

const update = business => ({
    type: UPDATE,
    business
})

const getOne = business => ({
    type: GET_ONE,
    business
})

const remove = id => ({
    type: DELETE,
    id
})

export const getOneBusiness = (id) => async dispatch => {
    const response = await fetch(`/api/biz/${id}`);
    if (response.ok){
        const businessObj = await response.json();
        const business = businessObj.business
        dispatch(getOne(business))
        return business
    }
    return response
}

export const businessSearch = (params) => async dispatch => {
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

    if(response.ok){
        const createdBiz = await response.json();
        const {image_url} = bizImage
        let newBizImage = {
            business_id: createdBiz.id,
            url: image_url
        }
        const newImageResponse = await fetch(`/api/biz/${createdBiz.id}/images`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(newBizImage)
        })
        if(newImageResponse.ok){
            const newImage = await newImageResponse.json();
            dispatch(create(createdBiz));
            return createdBiz
        }
    }
}

export const updateBusiness = (business, bizId) => async dispatch => {
    const response = await fetch(`/api/biz/${bizId}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(business)
    })

    if(response.ok){
        const review = await response.json()
        dispatch(update(business))
        return business
    }
}


export const deleteBusiness = (id) => async dispatch => {
    // console.log('PARAMS IN THUNK', params)
    const response = await fetch(`/api/biz/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok){
        const deletedBiz = await response.json()
        dispatch(remove(id))
        return deletedBiz
    }
    return response
}




const initialState = {allBusinesses: {}, singleBusiness: {}}

const businessReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case LOAD:{
            newState = {...state, allBusinesses: {...state.allBusinesses}, singleBusiness:{...state.singleBusiness}}
            let business2={}
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
            let newAllBusinesses = {...state.allBusinesses, [action.business.id]: action.business}
            newState.allBusinesses = newAllBusinesses
            return newState
        }
        case UPDATE: {
            newState = {...state, allBusinesses: {...state.allBusinesses} }
            newState.allBusinesses[action.business.id] = action.business
            return newState
        }
        case DELETE: {
            newState = {...state, allBusinesses: {...state.allBusinesses}, singleBusiness:{...state.singleBusiness}}
            delete newState.allBusinesses[action.id]
            return newState
        }
        default:
            return state
    }
}

export default businessReducer
