import {AppActions, SET_CURRENT_COUNTRIES, GET_CHART_DATA, GET_GLOBAL_DATA, GET_COUNTRIES, FETCH_DATA_PENDING} from '../types/actions'
import { Country, GraphData, GlobalData} from '../types/Country'
import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'

export const setCurrentCountries = (name:string []):AppActions => ({
    type:SET_CURRENT_COUNTRIES,
    name
})

export const getCountries = (countries : Country[]):AppActions => ({
    type:GET_COUNTRIES,
    countries,
})

export const getChartData = (chartData: GraphData []):AppActions => ({
    type: GET_CHART_DATA,
    chartData,
})

export const getGlobalData = (globalData: GlobalData):AppActions => ({
    type: GET_GLOBAL_DATA,
    globalData
})

export const fetchDataPending = ():AppActions => ({
    type: FETCH_DATA_PENDING
})

export function fetchDayOneDataCountry(countries?: string[]){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {

        dispatch(fetchDataPending())

        let graphDataArray: GraphData [] = []
            
        countries = countries || getState().countries.currentCountry;
    
        countries.forEach(element => {

            fetch(`https://api.covid19api.com/total/dayone/country/${element}/status/confirmed`)

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

                for(const item of items) {
                    let label : string = item.Date.slice(5,10)
                    let tupel : number = item.Cases as number
                    cases.push(tupel)
                    dates.push(label)
                }

                const graphData : GraphData = {
                    labels: dates,
                    series: [cases]
                } 

                graphDataArray.push(graphData);
                dispatch(getChartData(graphDataArray))
            })
            .catch(() => console.log("Error fetching data"));    
        })
    }

}

export function fetchCoronaData(url:string) {
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {

        dispatch(fetchDataPending())
        console.log(getState().countries.pending)
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => {

                dispatch(getGlobalData(items.Global))

                let countryArray : Country[] = []
                for(const item of items.Countries) { 
                    if(item.TotalConfirmed>0){
                        let country = new Country(item)
                        countryArray.push(country)
                    }                     
                }
                dispatch(getCountries(countryArray))
                console.log(getState().countries.pending)
            })
            .catch(() => console.log("Error fetching data"));
    };
}

export function startSettingCurrentCountry(name:string[]){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {
        dispatch(setCurrentCountries(name))
}

}


