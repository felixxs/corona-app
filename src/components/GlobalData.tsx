import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { startSettingCurrentCountry } from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState } from "../types/Country";
import { AppState } from '../store/configureStore'
import ChartistGraph from 'react-chartist'
import { IPieChartOptions } from 'chartist'
import Chartist from 'chartist'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

window["Chartist"] = Chartist;

const pointLabels = require("chartist-plugin-pointlabels")
const toolTips = require("chartist-plugin-tooltips-updated")
const fillDonut = require("chartist-plugin-fill-donut")
const legend = require('chartist-plugin-legend')



interface AppProps {
}

type Props = AppProps & LinkDispatchProps & LinkStateProps

const useStyles = makeStyles({
  root: {
    flexGrow: 3,
  },
});

export function GlobalData(props: Props) {

  
  const classes = useStyles()
  
  
  var data12 = {
    labels: [props.countries.globalData.TotalDeaths+ " Tote", props.countries.globalData.TotalRecovered+ " Geheilt",props.countries.globalData.TotalConfirmed-props.countries.globalData.TotalRecovered-props.countries.globalData.TotalDeaths + " Infiziert"],
    series: [props.countries.globalData.TotalDeaths, props.countries.globalData.TotalRecovered, props.countries.globalData.TotalConfirmed-props.countries.globalData.TotalRecovered-props.countries.globalData.TotalDeaths]
  };
  
  var options2:IPieChartOptions= {

    height: 400,
    width: 450,
    donut: true,
    donutWidth: 40,
    donutSolid: false,
    startAngle: 300,
    showLabel: true,
    labelOffset: 20,
   
    labelDirection: 'explode',
    plugins:[
      Chartist.plugins.fillDonut({
        items:[{
          content:`<h3> Totale Anzahl Fälle: ${props.countries.globalData.TotalConfirmed}<h3>`
        }]
      }), 
    ]
  }
    return (
      <div>
        <Paper className={classes.root}>
        <ChartistGraph data={data12} options={options2} type={'Pie'} />
        </Paper>
      </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(GlobalData);

