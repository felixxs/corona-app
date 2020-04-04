import {createStore, combineReducers, applyMiddleware} from 'redux'
import {countryReducer} from '../reducers/country'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { AppActions } from '../types/actions'



export const rootReducer = combineReducers({
    countries: countryReducer
})

export type AppState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>))