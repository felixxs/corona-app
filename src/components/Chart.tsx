import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSettingCurrentCountry } from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState, UserInteractionState } from "../types/Country";
import { AppState } from '../store/configureStore'
import ChartistGraph from 'react-chartist'
import { ILineChartOptions } from 'chartist'
import Chartist from 'chartist'

window["Chartist"] = Chartist;

const pointLabels = require("chartist-plugin-pointlabels")
const toolTips = require("chartist-plugin-tooltips-updated")



interface AppProps {
}

type Props = AppProps & LinkDispatchProps & LinkStateProps

export function LineChart(props: Props) {

  const lineChartOptions: ILineChartOptions = {
    showLine: true,
    fullWidth: true,
    showPoint:true,
    showArea:true,
    low: 0,
    chartPadding: {
      right: 40
    },
    plugins:[
        pointLabels(),
        toolTips({
            appendToBody: true
        })
    ]
  }

  if(props.users.chart==='linechart'){
    return (
      <div>
        {props.countries.chartData.map(element => 
        <div>
            <h1>{props.countries.currentCountry[props.countries.chartData.indexOf(element)]}</h1>
            <ChartistGraph data={element} options={lineChartOptions} type={'Line'} />
        </div>)}
      </div>
    )
  } else {
      return (
    <div>
      {props.countries.chartData.map(element => 
      <div>
          <h1>{props.countries.currentCountry[props.countries.chartData.indexOf(element)]}</h1>
          <ChartistGraph data={element} options={lineChartOptions} type={'Bar'} />
      </div>)}
    </div>
  )}

}


interface LinkStateProps {
  countries: CountryState
  users: UserInteractionState
}


interface LinkDispatchProps {
  startSettingCurrentCountry: (name: string[]) => void
}

const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps => ({
  countries: state.countries,
  users: state.userinteraction
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: AppProps): LinkDispatchProps => ({
  startSettingCurrentCountry: bindActionCreators(startSettingCurrentCountry, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

