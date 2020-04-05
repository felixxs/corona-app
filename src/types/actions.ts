import { Country, DayOneData } from "./Country";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_CURRENT_COUNTRY = 'SET_CURRENT_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'
export const GET_DAY_ONE_DATA_COUNTRY = 'GET_DAY_ONE_DATA_COUNTRY'


export interface GetCountriesAction{
    type: typeof GET_COUNTRIES, 
    countries: []
}

export interface SetCurrentCountry {
    type: typeof SET_CURRENT_COUNTRY
    name: string []
}

export interface AddCountry{
    type: typeof ADD_COUNTRY
    country: Country
}

export interface getDayOneDataCountry{
    type: typeof GET_DAY_ONE_DATA_COUNTRY
    dayOneData: DayOneData
}


export type CountryActionsTypes = GetCountriesAction | SetCurrentCountry | AddCountry | getDayOneDataCountry

export type AppActions = CountryActionsTypes