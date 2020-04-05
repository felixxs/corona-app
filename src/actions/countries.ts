import {GET_COUNTRIES, AppActions, SET_CURRENT_COUNTRY, ADD_COUNTRY} from '../types/actions'
import { Country } from '../types/Country'
import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'





export const setCurrentCountry = (name:string []):AppActions => ({
    type:SET_CURRENT_COUNTRY,
    name
})

export const getCountries = (countries:[]):AppActions => ({
    type:GET_COUNTRIES,
    countries
})

export const addCountry = (country : Country):AppActions => ({
    type:ADD_COUNTRY,
    country
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
            .then((items) => {

                items.Countries.forEach((element:any) => {
                    let country = new Country(element)
                    dispatch(addCountry(country)) 
                })
             console.log(getState())  
            })
            .catch(() => console.log("Error fetching data"));
    };
}

export function startSettingCurrentCountry(name:string[]){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {
        dispatch(setCurrentCountry(name))
        console.log(getState()) 
}

}
