import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reporeducer from '../reducers/reporeducer';
const middleware = [thunk]
const initialState = {
    repos: [],
    repo: {}
};
//create store
const store = createStore(reporeducer, initialState,applyMiddleware(...middleware,logger));

export default store;