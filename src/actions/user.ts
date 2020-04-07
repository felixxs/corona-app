import { Dispatch } from "redux"
import { AppState } from '../store/configureStore'
import {SWITCH_TABS, AppActions} from '../types/actions'

export const switchTabs= (showChart:boolean): AppActions => ({
    type:SWITCH_TABS,
    showChart
})

export function startSwitchingTabs (showChart:boolean){
    return (dispatch: Dispatch<AppActions>, getState:()=> AppState) => {
        dispatch(switchTabs(showChart))
    }

}