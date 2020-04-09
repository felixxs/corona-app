import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSettingCurrentCountry } from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState } from "../types/Country";
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

  const options: ILineChartOptions = {
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

  if (props.countries.chartData.length === 0) {
    return <h1>Bitte Land auswählen</h1>
  } else {
    return (
      <div>
        {props.countries.chartData.map(element => 
        <div>
            <h1>{props.countries.currentCountry[props.countries.chartData.indexOf(element)]}</h1>
            <ChartistGraph data={element} options={options} type={'Bar'} />
        </div>)}
      </div>
    )
  }

}


interface LinkStateProps {
  countries: CountryState
}


interface LinkDispatchProps {
  startSettingCurrentCountry: (name: string[]) => void
}

const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps => ({
  countries: state.countries
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: AppProps): LinkDispatchProps => ({
  startSettingCurrentCountry: bindActionCreators(startSettingCurrentCountry, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(LineChart);

