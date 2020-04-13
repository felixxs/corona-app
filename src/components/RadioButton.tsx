import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startSwitchingCharts } from "../actions/user";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { UserInteractionState } from "../types/Country";
import { AppState } from "../store/configureStore";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

interface AppProps {}
interface ComponentAppState {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    textAlign: "center",
    margin: 30,
  },
});

export function RadioButtonsGroup(props: Props) {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = (event.target as HTMLInputElement).value;
    props.startSwitchingCharts(targetValue);
  };

  return (
    <Paper className={classes.root}>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={props.user.chart}
          onChange={handleChange}
        >
          <FormControlLabel
            value="linechart"
            control={<Radio />}
            label="Line Chart"
          />
          <FormControlLabel
            value="barchart"
            control={<Radio />}
            label="Bar Chart"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

interface LinkStateProps {
  user: UserInteractionState;
}

interface LinkDispatchProps {
  startSwitchingCharts: (chart: string) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AppProps
): LinkStateProps => ({
  user: state.userinteraction,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AppProps
): LinkDispatchProps => ({
  startSwitchingCharts: bindActionCreators(startSwitchingCharts, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonsGroup);
