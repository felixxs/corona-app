import { Country, GraphData } from "./Country";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_CURRENT_COUNTRIES = 'SET_CURRENT_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const GET_DAY_ONE_DATA_COUNTRIES = 'GET_DAY_ONE_DATA_COUNTRY'
export const GET_CHART_DATA = 'GET_CHART_DATA'

export const SWITCH_TABS = 'SWITCH_TABS'

export interface SetCurrentCountries {
    type: typeof SET_CURRENT_COUNTRIES
    name: string []
}

export interface AddCountry{
    type: typeof ADD_COUNTRY
    country: Country
}

export interface switchTabsAction{
    type:typeof SWITCH_TABS
    showChart: boolean
}

export interface getChartLabel{
    type: typeof GET_CHART_DATA
    chartData: GraphData []
}


export type CountryActionsTypes =  SetCurrentCountries | AddCountry | getChartLabel

export type UserInteractionActionTypes = switchTabsAction

export type AppActions = CountryActionsTypes | UserInteractionActionTypes