import { combineReducers, legacy_createStore } from "redux"
import { reducer as authReducer } from "./authReducer"
import { reducer as expenseReducer } from "./expenseReducer"
import { reducer as editReducer } from "./editReducer"
const rootReducer = combineReducers({
    authReducer,
    expenseReducer,
    editReducer
})
export const store = legacy_createStore(rootReducer)