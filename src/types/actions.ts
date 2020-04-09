import { Country, GraphData, GlobalData} from "./Country";

export const SET_CURRENT_COUNTRIES = 'SET_CURRENT_COUNTRY'
export const GET_COUNTRIES = 'ADD_COUNTRY'
export const GET_CHART_DATA = 'GET_CHART_DATA'
export const GET_GLOBAL_DATA = 'GET_GLOBAL_DATA'
export const FETCH_DATA_PENDING ='FETCH_DATA_PENDING'
export const FETCH_DATA_SUCCESS =''

export const SWITCH_TABS = 'SWITCH_TABS'

export interface SetCurrentCountries {
    type: typeof SET_CURRENT_COUNTRIES
    name: string []
}

export interface getCountries{
    type: typeof GET_COUNTRIES
    countries: Country []
}

export interface getChartData{
    type: typeof GET_CHART_DATA
    chartData: GraphData []
}

export interface getGlobalData{
    type: typeof GET_GLOBAL_DATA
    globalData : GlobalData
}

export interface fetchDataPending{
    type: typeof FETCH_DATA_PENDING
}


export interface switchTabsAction{
    type:typeof SWITCH_TABS
    showChart: boolean
}


export type CountryActionsTypes =  SetCurrentCountries | getCountries | getChartData | getGlobalData | fetchDataPending

export type UserInteractionActionTypes = switchTabsAction

export type AppActions = CountryActionsTypes | UserInteractionActionTypes