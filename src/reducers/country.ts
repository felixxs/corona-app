import { CountryState, DayOneData } from "../types/Country";
import { AppActions, GET_COUNTRIES, SET_CURRENT_COUNTRY, ADD_COUNTRY, GET_DAY_ONE_DATA_COUNTRY} from "../types/actions"

const countryReducerDefaultState: CountryState = {
    countries:[],
    currentCountry:[],
    dayOneData: []
}

const countryReducer = (state = countryReducerDefaultState, action: AppActions): CountryState => {
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state, 
                countries: action.countries
            }
        case SET_CURRENT_COUNTRY:
            return{
                ...state,
                currentCountry: action.name
            }
        case ADD_COUNTRY: 
            return {
                ...state,
                countries: [...state.countries, action.country]
            }
        case GET_DAY_ONE_DATA_COUNTRY:
            return{
                ...state,
                dayOneData: [...state.dayOneData,action.dayOneData]
            }
        default:
            return state
    }

}

export {countryReducer}