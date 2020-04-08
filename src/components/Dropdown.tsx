import React from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import { startSettingCurrentCountry, fetchDayOneDataCountry} from '../actions/countries'
import { ThunkDispatch } from 'redux-thunk';
import { AppActions } from '../types/actions';
import { CountryState } from "../types/Country";
import {AppState} from '../store/configureStore'
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface AppProps{

}
interface ComponentAppState{

}

type Props = AppProps & LinkDispatchProps & LinkStateProps


export function SimpleSelect(props:Props) {
    
    const classes = useStyles();
    const theme = useTheme();
    const [country, setCountry] = React.useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string[]);
    props.startSettingCurrentCountry(event.target.value as string[])
    props.fetchDayOneDataCountry()
  };

  function getStyles(name: string, country: string[], theme: Theme) {
    return {
      fontWeight:
        country.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  return (
    <div>
        <FormControl className={classes.formControl}>
        <InputLabel id="demo-mutiple-chip-label">Länder</InputLabel>
        <Select
          labelId="demo-mutiple-chip-label"
          id="demo-mutiple-chip"
          multiple
          value={country}
          onChange={handleChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as string[]).map((value) => (
                <Chip key={value} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {props.countries.countries.map((name) => (
            <MenuItem key={name.Country} value={name.Country} style={getStyles(name.Country, country, theme)}>
              {name.Country}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


interface LinkStateProps{
    countries: CountryState
}
  
  
interface LinkDispatchProps{
    startSettingCurrentCountry: (name:string[]) => void
    fetchDayOneDataCountry:() => void
}
  
  
  
  const mapStateToProps = (state: AppState, ownProps: AppProps): LinkStateProps =>({
    countries: state.countries
  })
  
  const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions >, ownProps:AppProps):LinkDispatchProps => ({
    startSettingCurrentCountry:bindActionCreators(startSettingCurrentCountry, dispatch),
    fetchDayOneDataCountry:bindActionCreators(fetchDayOneDataCountry, dispatch)
  })
  
  export default connect(mapStateToProps, mapDispatchToProps)(SimpleSelect);