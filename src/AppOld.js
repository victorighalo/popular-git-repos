import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getRepos, sortData} from './actions/reposActions'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class App extends Component {
  componentWillMount(){
  this.props.getRepos()
  }

  createSortHandler = property => event => {
    console.log(this.props)
    // this.props.onRequestSort(event, property);
  };

  sortData(){
    console.log('Sort')
    this.props.sortData();
  }

  render() {
    const { classes } = this.props;
    const {data} = this.props;
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

//     let repos = this.props.data.map( (item, i) => (
//       <li key={i}>{item.name}</li>
// ))
const headerrow = [
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'owner', numeric: false, disablePadding: false, label: 'Owner' },
  { id: 'pushedat', numeric: false, disablePadding: false, label: 'Pushed At' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'forkcount', numeric: true, disablePadding: false, label: 'Fork Count' },
  { id: 'gazers', numeric: true, disablePadding: false, label: 'Star Gazers' },
  { id: 'prilang', numeric: false, disablePadding: false, label: 'Primary Language' }
];
    return (
      <div style={{justifyContent:'center', padding:50}}>
        <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {
              headerrow.map(row => {
                return (
                  <TableCell
                  key={row.id}
                  numeric={row.numeric}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                  
                  >
                  <p onClick={this.sortData(row.id)} >Sort</p>
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    
                  >
                  {row.label}
                  </TableSortLabel>
                  </TableCell>
                )
              })
            }
        
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map( (row,i) => {
            return (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.owner.login}</TableCell>
                <TableCell>{row.pushedAt}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell numeric>{row.forkCount}</TableCell>
                <TableCell numeric>{row.stargazers.totalCount}</TableCell>
                <TableCell>{row.primaryLanguage.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
      </div>
    );
  }
}



const mapStateToProps = state => ( {
  data: state.reporeducer.repos
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});

App.propTypes = {
  // numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  // onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  // rowCount: PropTypes.number.isRequired,
}; 

App = withStyles(styles, {name: 'App'})(App);
export default connect(mapStateToProps, {getRepos,sortData})(App);
