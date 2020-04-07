import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { fetchCoronaData} from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState, UserInteractionState} from "../types/Country";
import {AppState} from '../store/configureStore'
import SimpleSelect from './Dropdown'
import EnhancedTable from './EnhancedTable'
import TabBar from './TabBar'
import Chart from './Chart'


interface AppProps{

}
interface ComponentAppState{

}

type Props = AppProps & LinkDispatchProps & LinkStateProps

export class App extends React.Component<Props>{



  componentDidMount() {
  this.props.fetchCoronaData('https://api.covid19api.com/summary');
  console.log(this.props.countries.countries)
  }

  

  render(){

    const showChart = this.props.user.showChart
    let tab

    if(showChart){
      tab=<Chart></Chart>
    }
    else {
      tab=<EnhancedTable></EnhancedTable>
    }
    return(
      <div>
        <SimpleSelect></SimpleSelect>
        <TabBar></TabBar>
        {tab} 
      </div>
    )
    
    

  }

}

interface LinkStateProps{
  countries: CountryState
  user: UserInteractionState
}


interface LinkDispatchProps{
  fetchCoronaData: (url : string) => void
}



const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps =>({
  countries: state.countries,
  user: state.userinteraction
})

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions >, ownProps:AppProps):LinkDispatchProps => ({
  fetchCoronaData:bindActionCreators(fetchCoronaData, dispatch)
})


export default connect(mapStateToProps, mapDispatchToProps)(App);
