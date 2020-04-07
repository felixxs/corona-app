import { Country, iDayOneData } from "./Country";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_CURRENT_COUNTRIES = 'SET_CURRENT_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const GET_DAY_ONE_DATA_COUNTRIES = 'GET_DAY_ONE_DATA_COUNTRY'

export const SWITCH_TABS = 'SWITCH_TABS'


export interface GetCountriesAction{
    type: typeof GET_COUNTRIES, 
    countries: []
}

export interface SetCurrentCountries {
    type: typeof SET_CURRENT_COUNTRIES
    name: string []
}

export interface AddCountry{
    type: typeof ADD_COUNTRY
    country: Country
}

export interface getDayOneDataCountries{
    type: typeof GET_DAY_ONE_DATA_COUNTRIES
    dayOneData: iDayOneData []
}

export interface switchTabsAction{
    type:typeof SWITCH_TABS
    showChart: boolean
}


export type CountryActionsTypes = GetCountriesAction | SetCurrentCountries | AddCountry | getDayOneDataCountries

export type UserInteractionActionTypes = switchTabsAction

export type AppActions = CountryActionsTypes | UserInteractionActionTypes