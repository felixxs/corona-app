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

export function fetchDayOneDataCountry(countries?: string[]){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {

        let graphDataArray: GraphData [] = []
            
        countries = countries || getState().countries.currentCountry;
        // das da oben ist einfach nur syntax sugar für das hier
        // if(countries === undefined) {
        //     countries = getState().countries.currentCountry;
        // }


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
                    let label : string = item.Date.slice(0,10)
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


