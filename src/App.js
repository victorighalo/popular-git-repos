import React, { Component } from 'react';
import {connect} from 'react-redux';
import {getRepos, sortData, deleteRepo, selectRepo,deselectRepo} from './actions/reposActions';
import {TiArrowSortedDown, TiArrowSortedUp, TiTrash} from 'react-icons/ti';
import Modal from 'react-modal';
import store from './store/';
const headerData = [
  { id: 'name', sort:'asc',isSortable: true, numeric:false, label: 'Name' },
  { id: 'owner.login', sort:'asc',isSortable: true,numeric:false, label: 'Owner' },
  { id: 'pushedAt', sort:'asc',isSortable: true,numeric:false, label: 'Pushed At' },
  { id: 'description', sort:'asc',isSortable: false,numeric:false, label: 'Description' },
  { id: 'forkCount', sort:'asc',isSortable: true,numeric:true, label: 'Fork Count' },
  { id: 'stargazers.totalCount', sort:'asc',isSortable: true,numeric:true, label: 'Star Gazers' },
  { id: 'primaryLanguage.name', sort:'asc',isSortable: true,numeric:false, label: 'Primary Language' },
  { id: 'delete', sort:'asc',isSortable: false,numeric:false, label: 'Delete' },
  { id: 'view', sort:'asc',isSortable: false,numeric:false, label: 'View' },
];
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

  constructor() {
    super();

    this.state = {
      modalIsOpen: true
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount(){
  this.props.getRepos()
  }
  openModal() {
    // this.setState({modalIsOpen: true});
  }

  afterOpenModal() {

  }

  closeModal() {
    this.deselectRepo()
  }
 
  sortData(id,sort,numeric, isSortable){
    if(isSortable)
    this.switchSort(id, sort,numeric)
  }

  sortLabel(sort,isSortable){
    if(isSortable)
   if(sort === 'desc'){
      return <TiArrowSortedDown/>
    }else{
      return <TiArrowSortedUp/>
    }

  }

  deleteRepo(index){
this.props.deleteRepo(index);
  }

  selectRepo(index){
    this.props.selectRepo(index);
  }
  deselectRepo(){
    this.props.deselectRepo();
  }

  switchSort(id, sort,numeric){
    let currentSort;
    headerData.forEach( (item) => {
      if(item.id === id){
        if(item.sort === 'asc'){
          item.sort = 'desc';
          currentSort = 'desc'
          }else{
            item.sort = 'asc';
            currentSort = 'asc'
          }
      }
    });
    this.props.sortData(id,currentSort,numeric);
  }

  render() {
    const {data} = this.props;
    const {repo} = this.props;

    return (
      <div style={{justifyContent:'center', backgroundColor:'#F5F5F5'}} className="table-responsive">
      <div style={{
      height:'150px', 
      backgroundColor:'#2196F3', 
      textAlign:'center', 
      color:'#fff', 
      padding:'15px'
      }}>
      <h3>Popular Github Repositories</h3>
        </div>
        <div style={{padding:50}}>
        {store.getState().repo.hasOwnProperty('name') === true &&
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          ariaHideApp={false}
        >
        {store.getState().repo.hasOwnProperty('name') === true &&
        <div>
          <p>Name: {repo.name}</p>
          <p>Onwer: {repo.owner.login}</p>
          <p>Stargazers: {repo.stargazers.totalCount}</p>
          <p>Primary language: {repo.primaryLanguage.name}</p>
          <p>Pushed At: {repo.pushedAt}</p>
          <p>Description: {repo.description}</p>
          <button onClick={this.closeModal}>close</button>
          </div>
        }
        </Modal>
        }
      <table className="table table-borderless table-hover table-sm">
      <thead>
      <tr >
      {
        headerData.map( (row) => {
          return (
            <th scope="col" 
            key={row.id}
            onClick={
              () => this.sortData(row.id, row.sort, row.numeric, row.isSortable)
            }
            style={{cursor:'pointer'}}
            >
              {row.label}
             { this.sortLabel(row.sort,row.isSortable)}
            </th>
          )
        })
      }
       </tr>
        </thead>
        <tbody>
          {data.map( (row,i) => {
            return (
              <tr key={i}>
                <td>
                  {row.name}
                </td>
                <td>{row.owner.login}</td>
                <td>{row.pushedAt}</td>
                <td>{row.description}</td>
                <td>{row.forkCount}</td>
                <td>{row.stargazers.totalCount}</td>
                <td>{row.primaryLanguage.name}</td>
                <td onClick = { 
                  ()=> this.deleteRepo(i)
                }><button className="btn btn-danger btn-sm">Delete <TiTrash/></button>
                </td>
                <td onClick = { 
                  ()=> this.selectRepo(i)
                }><button className="btn btn-primary btn-sm">View</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
      </div>
    );
  }
}



const mapStateToProps = state => ( {
  data: state.repos,
  repo: state.repo
});

export default connect(mapStateToProps, {getRepos,sortData,deleteRepo,selectRepo,deselectRepo})(App);
