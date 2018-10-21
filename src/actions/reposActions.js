import store from '../store/';
let data = require('../assets/data.json');
export function getRepos(){
    return function(dispatch){
        dispatch(
            {
                type: 'FETCH_REPOS',
                payload: data.repositories
            }
        )
    }
}

export function deleteRepo(index){
    return function(dispatch){
        let filterdata = Object.assign([], store.getState().repos).filter( (value, i) => 
           i !== index
        );
        dispatch(
            {
                type: 'DELETE_REPO',
                payload: filterdata
            }
        )
    }
}

export function selectRepo(index){
    return function(dispatch){
        let singledata = Object.assign([], store.getState().repos).find( (value, i) => 
           i === index
        );
        dispatch(
            {
                type: 'SELECT_REPO',
                payload: singledata
            }
        )
    }
}

export function deselectRepo(index){
    return function(dispatch){
        dispatch(
            {
                type: 'DESELECT_REPO',
                payload: {}
            }
        )
    }
}

export function sortData(id,currentSort,numeric){
    console.log(numeric)
    return function(dispatch){
        let sorteddata;
        if(numeric){
                let params = id.split(".");
                if(params.length === 1){
                sorteddata = Object.assign([], data.repositories).sort(
                    (a, b) => {
                        if(currentSort === 'asc'){
                            return a[params[0]] - b[params[0]]
                        }else{
                            return b[params[0]] - a[params[0]]
                        }
                   
                })
                }else{
                    sorteddata = Object.assign([], data.repositories).sort(
                        (a, b) => {
                            if(currentSort === 'asc'){
                                return  a[params[0]][params[1]] - b[params[0]][params[1]]
                            }else{
                                return  b[params[0]][params[1]] - a[params[0]][params[1]] 
                            }
                
                    })
                }
        }else{
            let params = id.split(".");
            if(params.length === 1){
            sorteddata = Object.assign([], data.repositories).sort(
                (a, b) => {
                    if(currentSort === 'asc'){
               if( a[`${id}`].toLowerCase() < b[`${id}`].toLowerCase()){ return -1}
               if( a[`${id}`].toLowerCase() > b[`${id}`].toLowerCase()){ return 1}
               return 0;
                    }else{
                        if( b[`${id}`].toLowerCase() < a[`${id}`].toLowerCase()){ return -1}
                        if( b[`${id}`].toLowerCase() > a[`${id}`].toLowerCase()){ return 1}
                        return 0;  
                    }
            })
            }else{
                sorteddata = Object.assign([], data.repositories).sort(
                    (a, b) => {
                        if(currentSort === 'asc'){
                   if( a[params[0]][params[1]].toLowerCase() < b[params[0]][params[1]].toLowerCase()){ return -1}
                   if( a[params[0]][params[1]].toLowerCase() > b[params[0]][params[1]].toLowerCase()){ return 1}
                   return 0;
                        }else{
                            if( b[params[0]][params[1]].toLowerCase() < a[params[0]][params[1]].toLowerCase()){ return -1}
                            if( b[params[0]][params[1]].toLowerCase() > a[params[0]][params[1]].toLowerCase()){ return 1}
                            return 0;
                        }
                })
            }
        }

        dispatch(
            {
                type: 'SORT_REPOS',
                payload: sorteddata
            }
        )
    }
}