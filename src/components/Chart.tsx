import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { startSettingCurrentCountry} from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState} from "../types/Country";
import {AppState} from '../store/configureStore'
import ChartistGraph from 'react-chartist'
import {ILineChartOptions } from 'chartist';


interface AppProps{
}

type Props = AppProps & LinkDispatchProps & LinkStateProps 

export function LineChart (props:Props){

    const options : ILineChartOptions = {
        showLine:true,
        fullWidth:true,
        low:0,
        chartPadding: {
            right: 40
        }
    }
            
    if(props.countries.chartData.length===0){
        return <h1>Bitte Land auswählen</h1>
    } else {
        return (
            <div>
                {props.countries.chartData.map(element => <ChartistGraph data={element} options={options} type={'Line'}/>)}
            </div>
        )
        }
        
}


  interface LinkStateProps{
    countries: CountryState
  }
  
  
  interface LinkDispatchProps{
    startSettingCurrentCountry: (name:string[]) => void
  }
  
  const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps =>({
    countries: state.countries
  })
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions >, ownProps:AppProps):LinkDispatchProps => ({
    startSettingCurrentCountry:bindActionCreators(startSettingCurrentCountry, dispatch),
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

