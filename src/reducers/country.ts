import { CountryState } from "../types/Country";
import { AppActions, GET_COUNTRIES, SET_CURRENT_COUNTRY} from "../types/actions"

const countryReducerDefaultState: CountryState = {
    countries:[],
    currentCountry:""
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
        default:
            return state
    }

}

export {countryReducer}