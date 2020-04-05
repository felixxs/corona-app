export interface CountryState {
    countries: Country[],
    currentCountry: string []
    dayOneData: DayOneData[]
}

export class DayOneData{
    country:string
    date:number[]
    confirmedCorona: number []

    constructor(DayOneResponse: any){
        this.country = DayOneResponse.Country
        this.date = DayOneResponse.data
        this.confirmedCorona = DayOneResponse.confirmedCorona
    
    }

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