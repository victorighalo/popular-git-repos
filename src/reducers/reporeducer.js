
const initialState = {
    repos: [],
    repo: {}
};

const reporeducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_REPOS': {
          return { ...state, repos: action.payload }
        }
        case 'SORT_REPOS': {
            return { ...state, repos: action.payload }
          }
          case 'DELETE_REPO': {
            return { ...state, repos: action.payload }
          }
          case 'SELECT_REPO': {
            return { ...state, repo: action.payload }
          }
          case 'DESELECT_REPO': {
            return { ...state, repo: action.payload }
          }
        default:
          return state;
      }
}  

export default reporeducer;