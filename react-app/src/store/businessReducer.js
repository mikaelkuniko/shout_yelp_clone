import { csrfFetch } from "./csrf"

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
