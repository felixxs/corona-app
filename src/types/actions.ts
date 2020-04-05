import { Country } from "./Country";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_CURRENT_COUNTRY = 'SET_CURRENT_COUNTRY'
export const ADD_COUNTRY = 'ADD_COUNTRY'


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


export type CountryActionsTypes = GetCountriesAction | SetCurrentCountry | AddCountry

export type AppActions = CountryActionsTypes