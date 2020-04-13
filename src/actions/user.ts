import { Dispatch } from "redux";
import { AppState } from "../store/configureStore";
import { SWITCH_TABS, AppActions, SWITCH_CHART_TYPE } from "../types/actions";

export const switchTabs = (showChart: boolean): AppActions => ({
  type: SWITCH_TABS,
  showChart,
});

export const switchCharts = (chart: string): AppActions => ({
  type: SWITCH_CHART_TYPE,
  chart,
});

export function startSwitchingCharts(chart: string) {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(switchCharts(chart));
  };
}

export function startSwitchingTabs(showChart: boolean) {
  return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(switchTabs(showChart));
  };
}
