import { CountryState, UserInteractionState } from "../types/Country";
import { AppActions, SET_CURRENT_COUNTRIES, ADD_COUNTRY, SWITCH_TABS, GET_CHART_DATA} from "../types/actions"

const countryReducerDefaultState: CountryState = {
    countries:[],
    currentCountry:[],
    chartData: []
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
        case GET_CHART_DATA:
            return{
                ...state,
                chartData: action.chartData
            }
        default:
            return state
    }

}

export {countryReducer}
export {userInteractionReducer}