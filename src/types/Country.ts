export interface CountryState {
    countries: Country[],
    currentCountry: string []
    dayOneData: iDayOneData[]
}

export interface UserInteractionState {
    showChart:boolean
}

export class DayOneData{

    Country: string
    CountryCode: string
    Lat: number
    Lon: number
    Cases: number
    Status: string
    Date: string


    constructor(DayOneResponse: any){
        this.Country = DayOneResponse.Country
        this.CountryCode = DayOneResponse.CountryCode
        this.Lat = DayOneResponse.Lat
        this.Lon = DayOneResponse.Lon
        this.Cases = DayOneResponse.Cases
        this.Status =DayOneResponse.Status 
        this.Date = DayOneResponse.Date

    }
}

export interface iDayOneData{
    
    name:string 
    data:number[]
    
}

export class Country {
    Country:string
    Slug:string
    NewConfirmed:number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number

    constructor(countryResponse: any){
        this.Country = countryResponse.Country
        this.Slug = countryResponse.Slug
        this.NewConfirmed = countryResponse.NewConfirmed
        this.TotalConfirmed = countryResponse.TotalConfirmed
        this.NewDeaths = countryResponse.NewDeaths
        this.TotalDeaths = countryResponse.TotalDeaths
        this.NewRecovered = countryResponse.NewRecovered
        this.TotalRecovered = countryResponse.TotalRecovered
    }
}