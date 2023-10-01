import { USER_LOGIN, USER_LOGOUT } from "./actionType"


const initialState = {
    isAuth: false,
}


export const reducer = (state = initialState, { type }) => {

    switch (type) {
        case USER_LOGIN: {
            return {
                ...state,
                isAuth: true,
            }
        }

        case USER_LOGOUT: {

            return {
                ...initialState
            }
        }
        default: return state
    }
}