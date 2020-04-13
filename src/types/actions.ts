import { Country, GraphData, GlobalData } from "./Country";

export const SET_CURRENT_COUNTRIES = "SET_CURRENT_COUNTRY";
export const GET_COUNTRIES = "ADD_COUNTRY";
export const GET_CHART_DATA = "GET_CHART_DATA";
export const GET_GLOBAL_DATA = "GET_GLOBAL_DATA";
export const FETCH_DATA_PENDING = "FETCH_DATA_PENDING";

export const SWITCH_CHART_TYPE = "SWITCH_CHART_TYPE";
export const SWITCH_TABS = "SWITCH_TABS";

export interface SetCurrentCountries {
  type: typeof SET_CURRENT_COUNTRIES;
  name: string[];
}

export interface getCountries {
  type: typeof GET_COUNTRIES;
  countries: Country[];
}

export interface getChartData {
  type: typeof GET_CHART_DATA;
  chartData: GraphData[];
}

export interface getGlobalData {
  type: typeof GET_GLOBAL_DATA;
  globalData: GlobalData;
}

export interface fetchDataPending {
  type: typeof FETCH_DATA_PENDING;
}

export interface switchTabsAction {
  type: typeof SWITCH_TABS;
  showChart: boolean;
}

export interface switchChartTypes {
  type: typeof SWITCH_CHART_TYPE;
  chart: string;
}

export type CountryActionsTypes =
  | SetCurrentCountries
  | getCountries
  | getChartData
  | getGlobalData
  | fetchDataPending;

export type UserInteractionActionTypes = switchTabsAction | switchChartTypes;

export type AppActions = CountryActionsTypes | UserInteractionActionTypes;
