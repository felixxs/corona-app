import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import TabPanel from "@material-ui/core/Tab";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { switchTabs } from "../actions/user";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { UserInteractionState } from "../types/Country";
import { AppState } from "../store/configureStore";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    margin: 30,
  },
});

interface AppProps {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

export function CenteredTabs(props: Props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (newValue === 1) {
      props.switchTabs(true);
    } else {
      props.switchTabs(false);
    }
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <TabPanel label="Corona Table" />
        <TabPanel label="Corona Chart" />
      </Tabs>
    </Paper>
  );
}

interface LinkStateProps {
  users: UserInteractionState;
}

interface LinkDispatchProps {
  switchTabs: (showChart: boolean) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AppProps
): LinkStateProps => ({
  users: state.userinteraction,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AppProps
): LinkDispatchProps => ({
  switchTabs: bindActionCreators(switchTabs, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(CenteredTabs);
