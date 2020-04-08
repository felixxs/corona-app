import {AppActions, SET_CURRENT_COUNTRIES, ADD_COUNTRY, GET_CHART_DATA} from '../types/actions'
import { Country, GraphData} from '../types/Country'
import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'

export const setCurrentCountries = (name:string []):AppActions => ({
    type:SET_CURRENT_COUNTRIES,
    name
})

export const addCountry = (country : Country):AppActions => ({
    type:ADD_COUNTRY,
    country
})

export const getChartData = (chartData: GraphData []):AppActions => ({
    type: GET_CHART_DATA,
    chartData
})

export function fetchDayOneDataCountry(){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {

        let graphDataArray: GraphData [] = []
            
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
                let cases: number [] = []
                let dates: string [] = []

                items.forEach((element:any) => {
                    let label : string = element.Date.slice(0,10)
                    let tupel : number = element.Cases as number
                    cases.push(tupel)
                    dates.push(label)
                })

                let graphData : GraphData = {
                    labels: dates,
                    series: [cases]
                } 
             graphDataArray.push(graphData)
            })
            .catch(() => console.log("Error fetching data"));    
        })

        dispatch(getChartData(graphDataArray))
    }

}

export function fetchCoronaData(url:string) {
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
            })
            .catch(() => console.log("Error fetching data"));
    };
}

export function startSettingCurrentCountry(name:string[]){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {
        dispatch(setCurrentCountries(name))
}

}


