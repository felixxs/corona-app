export interface CountryState {
    countries: Country[],
    currentCountry: string
}

export interface Country {
    Country:string,
    Slug:string,
    NewConfirmed:number,
    TotalConfirmed: number,
    NewDeaths: number,
    TotalDeaths: number,
    NewRecovered: number,
    TotalRecovered: number
}