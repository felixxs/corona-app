export interface CountryState {
    countries: Country[],
    currentCountry: string []
}

export class Country {
    Country:string
    NewConfirmed:number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number

    constructor(countryResponse: any){
        this.Country = countryResponse.Country
        this.NewConfirmed = countryResponse.NewConfirmed
        this.TotalConfirmed = countryResponse.TotalConfirmed
        this.NewDeaths = countryResponse.NewDeaths
        this.TotalDeaths = countryResponse.TotalDeaths
        this.NewRecovered = countryResponse.NewRecovered
        this.TotalRecovered = countryResponse.TotalRecovered
    }
}