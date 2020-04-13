import { createStore, combineReducers, applyMiddleware } from "redux";
import { countryReducer, userInteractionReducer } from "../reducers/country";
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from "../types/actions";
import { composeWithDevTools } from "redux-devtools-extension";

export const rootReducer = combineReducers({
  countries: countryReducer,
  userinteraction: userInteractionReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)
  )
);
