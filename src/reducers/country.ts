import { CountryState, UserInteractionState } from "../types/Country";
import {
  AppActions,
  SET_CURRENT_COUNTRIES,
  GET_COUNTRIES,
  SWITCH_TABS,
  GET_CHART_DATA,
  GET_GLOBAL_DATA,
  FETCH_DATA_PENDING,
  SWITCH_CHART_TYPE,
} from "../types/actions";

const countryReducerDefaultState: CountryState = {
  countries: [],
  currentCountry: [],
  chartData: [],
  globalData: {
    NewConfirmed: 0,
    TotalConfirmed: 0,
    NewDeaths: 0,
    TotalDeaths: 0,
    NewRecovered: 0,
    TotalRecovered: 0,
  },
  pending: false,
};

const userInteractionReducerDefaultState: UserInteractionState = {
  showChart: false,
  chart: "linechart",
};

const userInteractionReducer = (
  state = userInteractionReducerDefaultState,
  action: AppActions
): UserInteractionState => {
  switch (action.type) {
    case SWITCH_TABS:
      return {
        ...state,
        showChart: action.showChart,
      };
    case SWITCH_CHART_TYPE:
      return {
        ...state,
        chart: action.chart,
      };
    default:
      return state;
  }
};

const countryReducer = (
  state = countryReducerDefaultState,
  action: AppActions
): CountryState => {
  switch (action.type) {
    case SET_CURRENT_COUNTRIES:
      return {
        ...state,
        currentCountry: action.name,
      };
    case GET_COUNTRIES:
      return {
        ...state,
        pending: false,
        countries: action.countries,
      };
    case GET_CHART_DATA:
      return {
        ...state,
        pending: false,
        chartData: action.chartData,
      };
    case GET_GLOBAL_DATA:
      return {
        ...state,
        globalData: action.globalData,
      };
    case FETCH_DATA_PENDING:
      return {
        ...state,
        pending: true,
      };
    default:
      return state;
  }
};

export { countryReducer };
export { userInteractionReducer };
