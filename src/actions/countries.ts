import {GET_COUNTRIES, AppActions, SET_CURRENT_COUNTRIES, ADD_COUNTRY, GET_DAY_ONE_DATA_COUNTRIES} from '../types/actions'
import { Country, iDayOneData} from '../types/Country'
import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'

export const setCurrentCountries = (name:string []):AppActions => ({
    type:SET_CURRENT_COUNTRIES,
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

export const getDayOneDataCountrys = (dayOneData : iDayOneData[]):AppActions => ({
    type: GET_DAY_ONE_DATA_COUNTRIES,
    dayOneData
})

export function fetchDayOneDataCountry(){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {

        let allDayOneDataArrays: iDayOneData [] = []

        getState().countries.currentCountry.forEach(element => {

             let country = getState().countries.countries.find(country => element===country.Country)


            fetch(`https://api.covid19api.com/total/dayone/country/${country?.Slug}/status/confirmed`)

            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                let name: string = items[0].Country
                let data: number [] = []
                items.forEach((element:any) => {
                    let tupel : number = element.Cases as number
                    data.push(tupel)
                })
                let idayOneData : iDayOneData = {
                    name,
                    data
                } 
             allDayOneDataArrays.push(idayOneData)
             console.log(getState())  
            })
            .catch(() => console.log("Error fetching data"));
            
            
        });

        dispatch(getDayOneDataCountrys(allDayOneDataArrays))
    };

}

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
        dispatch(setCurrentCountries(name))
}

}


