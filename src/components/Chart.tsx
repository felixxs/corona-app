import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { startSettingCurrentCountry} from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState} from "../types/Country";
import {AppState} from '../store/configureStore'
import ChartistGraph from 'react-chartist'


interface AppProps{
}

type Props = AppProps & LinkDispatchProps & LinkStateProps 



export class LineChart extends React.Component<Props> {
    constructor(props:Props){
        super(props)
    }

   
    
    
      
    componentDidUpdate(){ 

    }
 

    render() {

        var simpleLineChartData = {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            series: this.props.countries.dayOneData
          }
    
        var type = 'Line'
    
        return (
          <div>
            <ChartistGraph data={simpleLineChartData}  type={type} />
          </div>
        )
      }
}

  interface LinkStateProps{
    countries: CountryState
  }
  
  
  interface LinkDispatchProps{
  }
  
  
  
  const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps =>({
    countries: state.countries
  })
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions >, ownProps:AppProps):LinkDispatchProps => ({
    startSettingCurrentCountry:bindActionCreators(startSettingCurrentCountry, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

