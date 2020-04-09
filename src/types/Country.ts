export interface CountryState {
    countries: Country[],
    currentCountry: string []
    chartData: GraphData []
    globalData: GlobalData
    pending: boolean
}

export interface UserInteractionState {
    showChart:boolean
    chart: string
}

export interface GraphData{
    labels: string[]
    series: [number[]]
}

export interface GlobalData{
    NewConfirmed: number
    TotalConfirmed: number
    NewDeaths: number
    TotalDeaths: number
    NewRecovered: number
    TotalRecovered: number
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

