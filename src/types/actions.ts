import { Country } from "./Country";

export const GET_COUNTRIES = 'GET_COUNTRIES'
export const SET_CURRENT_COUNTRY = 'SET_CURRENT_COUNTRY'


export interface GetCountriesAction{
    type: typeof GET_COUNTRIES, 
    countries: Country[]
}

export interface SetCurrentCountry {
    type: typeof SET_CURRENT_COUNTRY
    name: string
}


export type CountryActionsTypes = GetCountriesAction | SetCurrentCountry

export type AppActions = CountryActionsTypes