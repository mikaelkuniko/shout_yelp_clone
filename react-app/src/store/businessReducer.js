const LOAD = 'bizes/LOAD'
const CREATE = 'bizes/CREATE'
const DELETE = 'bizes/DELETE'
const GET_ONE = 'bizes/GET_ONE'
const CREATE_IMG = 'bizes/image/CREATE'

const load = bizes => ({
    type: LOAD,
    bizes
})

const create = biz => ({
    type: CREATE,
    biz
})

const createImage = image => ({
    type: CREATE,
    image
})

const getOne = biz => ({
    type: GET_ONE,
    biz
})

const remove = bizId => ({
    type: DELETE,
    bizId
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





const initialState = {allBusinesses: {}, singleBusiness: {}}

const businessReducer = (state = initialState, action) => {
    let newState;
    switch (action.type){
        case GET_ONE: {
            newState = {
                ...state,
                allBusinesses: {...state.allBusinesses},
                singleBusiness: {}
            }
            newState.singleBusiness = action.biz
            return newState
        }
        default:
            return state
    }
}

export default businessReducer
