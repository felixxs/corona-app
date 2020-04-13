import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { startSettingCurrentCountry } from "../actions/countries";
import { ThunkDispatch } from "redux-thunk";
import { AppActions } from "../types/actions";
import { CountryState, Country } from "../types/Country";
import { AppState } from "../store/configureStore";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Country;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "Country", numeric: false, disablePadding: false, label: "Country" },
  {
    id: "NewConfirmed",
    numeric: false,
    disablePadding: true,
    label: "New Confirmed Cases",
  },
  {
    id: "TotalConfirmed",
    numeric: true,
    disablePadding: false,
    label: "Total Confirmed Cases",
  },
  {
    id: "NewDeaths",
    numeric: true,
    disablePadding: false,
    label: "New Deaths",
  },
  {
    id: "TotalDeaths",
    numeric: true,
    disablePadding: false,
    label: "Total Deaths",
  },
  {
    id: "NewRecovered",
    numeric: true,
    disablePadding: false,
    label: "New Recovered",
  },
  {
    id: "TotalRecovered",
    numeric: true,
    disablePadding: false,
    label: "Total Recovered",
  },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Country
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: keyof Country) => (
    event: React.MouseEvent<unknown>
  ) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "30px",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
  })
);

interface AppProps {}
interface ComponentAppState {}

type Props = AppProps & LinkDispatchProps & LinkStateProps;

export function EnhancedTable(props: Props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Country>("Country");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Country
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let rows = props.countries.countries.filter((country) =>
    props.countries.currentCountry.includes(country.Country)
  );

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size="small"
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow hover tabIndex={-1} key={row.Country}>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="default"
                      >
                        {row.Country}
                      </TableCell>
                      <TableCell align="center">{row.NewConfirmed}</TableCell>
                      <TableCell align="center">{row.TotalConfirmed}</TableCell>
                      <TableCell align="center">{row.NewDeaths}</TableCell>
                      <TableCell align="center">{row.TotalDeaths}</TableCell>
                      <TableCell align="center">{row.NewRecovered}</TableCell>
                      <TableCell align="center">{row.TotalRecovered}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 33 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

interface LinkStateProps {
  countries: CountryState;
}

interface LinkDispatchProps {
  startSettingCurrentCountry: (name: string[]) => void;
}

const mapStateToProps = (
  state: AppState,
  ownProps: AppProps
): LinkStateProps => ({
  countries: state.countries,
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<any, any, AppActions>,
  ownProps: AppProps
): LinkDispatchProps => ({
  startSettingCurrentCountry: bindActionCreators(
    startSettingCurrentCountry,
    dispatch
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnhancedTable);
