import {GET_COUNTRIES, AppActions, SET_CURRENT_COUNTRY} from '../types/actions'
import { Country } from '../types/Country'
import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'




export const setCurrentCountry = (name:string):AppActions => ({
    type:SET_CURRENT_COUNTRY,
    name
})

export const getCountries = (countries: Country[]):AppActions => ({
    type:GET_COUNTRIES,
    countries
})

export function fetchCoronaData(url:string) {
    console.log("start fetching")
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(getCountries((items.Countries))))
            .catch(() => console.log("Error fetching data"));
    };
}


