import { EDIT_REQUEST, EDIT_SUCCESS, FETCH_FAILURE, FETCH_REQUEST, FETCH_SUCCESS, USER_LOGIN, USER_LOGOUT } from "./actionType"

export const userLoggedIn = (payload) => {
    return { type: USER_LOGIN, payload }
}

export const userLoggedOut = () => {
    return { type: USER_LOGOUT }
}


export const fetchRequestAction = () => {
    return { type: FETCH_REQUEST }
}

export const fetchSuccessAction = (payload) => {
    return { type: FETCH_SUCCESS, payload }
}

export const fetchFailureAction = () => {
    return { type: FETCH_FAILURE }
}


export const editRequestAction = (payload) => {
    return { type: EDIT_REQUEST, payload }
}

export const editSuccessAction = () => {
    return { type: EDIT_SUCCESS }
}

