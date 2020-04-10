import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCoronaData } from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState, UserInteractionState } from "../types/Country";
import { AppState } from '../store/configureStore'
import SimpleSelect from './Dropdown'
import EnhancedTable from './EnhancedTable'
import TabBar from './TabBar'
import Chart from './Chart'
import {Spinner} from './Spinner'
import  RadioButtonsGroup  from './RadioButton';
import GlobalDialog from './GlobalDialog'
import '../css/App.css'


interface AppProps {

}
interface ComponentAppState {

}

type Props = AppProps & LinkDispatchProps & LinkStateProps

export class App extends React.Component<Props>{

  componentDidMount() {
    this.props.fetchCoronaData('https://api.covid19api.com/summary');
  }

  render() {

    const showChart = this.props.user.showChart
    const loading = this.props.countries.pending
    let tab
    let spinner

    if(loading){
      spinner=  <Spinner></Spinner>
    }

    if (showChart) {
      tab = <div>
              <RadioButtonsGroup></RadioButtonsGroup>
              <Chart/>
            </div>
    }
    else {
      tab = <EnhancedTable></EnhancedTable>
    }
    return (
      <div className="App">
        <GlobalDialog></GlobalDialog>
        <SimpleSelect></SimpleSelect>
        <TabBar></TabBar>
        {spinner}
        {tab}
      </div>
    )



  }

}

interface LinkStateProps {
  countries: CountryState
  user: UserInteractionState
}


interface LinkDispatchProps {
  fetchCoronaData: (url: string) => void
}

const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps => ({
  countries: state.countries,
  user: state.userinteraction
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownProps: AppProps): LinkDispatchProps => ({
  fetchCoronaData: bindActionCreators(fetchCoronaData, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
