import { FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS } from "./actionType"


const initialState = {
    isLoading: false,
    expenses: [],
    isError: false
}

export const reducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case FETCH_REQUEST: {
            return {
                ...state,
                isLoading: true

            }
        }
        case FETCH_SUCCESS: {
            return {
                ...state,
                isLoading: false,
                expenses: payload
            }
        }

        case FETCH_FAILURE: {
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        }
        default: return state
    }
}