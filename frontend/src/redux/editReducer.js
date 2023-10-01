import { EDIT_REQUEST, EDIT_SUCCESS } from "./actionType"


const initState = {}

export const reducer = (state = initState, { type, payload }) => {
    switch (type) {
        case EDIT_REQUEST: {
            return {
                ...state,
                ...payload
            }
        }

        case EDIT_SUCCESS: {
            return {
                ...initState
            }
        }
        default: return state
    }
} 