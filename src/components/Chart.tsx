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
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import '../css/Tooltip.css'
import { colors } from '@material-ui/core';

window["Chartist"] = Chartist;

const pointLabels = require("chartist-plugin-pointlabels")
const toolTips = require("chartist-plugin-tooltips-updated")



interface AppProps {
}

type Props = AppProps & LinkDispatchProps & LinkStateProps

const useStyles = makeStyles({
    root: {
      flexGrow: 1,
      margin: 30
    },
    center: {
        textAlign:'center',
        paddingTop:10, 
        marginTop: 30,
        fontFamily: 'Roboto, sans-serif;',
        color: '#9e9e9e',
        fontSize: '14px',
        fontStyle: 'normal'
    }
  });

export function LineChart(props: Props) {

  const classes = useStyles()

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
        Chartist.plugins.tooltip({
            appendToBody: false,
            className:'tooltip'
        })
    ]
  }

  if(props.users.chart==='linechart'){
    return (
      <div>
        <div></div>
        {props.countries.chartData.map(element => 
        <div>
            <Paper className={classes.root}>
            <h1 className={classes.center}>{props.countries.currentCountry[props.countries.chartData.indexOf(element)]}</h1>
            <ChartistGraph className={classes.center} data={element} options={lineChartOptions} type={'Line'} />
            </Paper>
        </div>)}
      </div>
    )
  } else {
      return (
    <div>
      {props.countries.chartData.map(element => 
      <div>
          <Paper className={classes.root}>
          <h1 className={classes.center}>{props.countries.currentCountry[props.countries.chartData.indexOf(element)]}</h1>
          <ChartistGraph  className={classes.center} data={element} options={lineChartOptions} type={'Bar'} />
          </Paper>
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

