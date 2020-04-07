import { CountryState, UserInteractionState } from "../types/Country";
import { AppActions, GET_COUNTRIES, SET_CURRENT_COUNTRIES, ADD_COUNTRY, GET_DAY_ONE_DATA_COUNTRIES, SWITCH_TABS} from "../types/actions"

const countryReducerDefaultState: CountryState = {
    countries:[],
    currentCountry:[],
    dayOneData: [{
        name:"Andorra", 
        data:[4,5,6,7,8,1,1,1,1,1,1,1]
    }]
}

const userInteractionReducerDefaultState: UserInteractionState ={
    showChart:false
}



const userInteractionReducer = (state = userInteractionReducerDefaultState, action: AppActions): UserInteractionState =>{
    switch(action.type){
        case SWITCH_TABS:
            return{
                ...state,
                showChart:action.showChart
            }
        default: 
            return state
    }
}

const countryReducer = (state = countryReducerDefaultState, action: AppActions): CountryState => {
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state, 
                countries: action.countries
            }
        case SET_CURRENT_COUNTRIES:
            return{
                ...state,
                currentCountry: action.name
            }
        case ADD_COUNTRY: 
            return {
                ...state,
                countries: [...state.countries, action.country]
            }
        case GET_DAY_ONE_DATA_COUNTRIES:
            return{
                ...state,
                dayOneData: action.dayOneData
            }
        default:
            return state
    }

}

export {countryReducer}
export {userInteractionReducer}