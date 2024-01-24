import { combineReducers } from 'redux';
import createReducers from '../../helper/createReducer';

import {ADD_USER, FETCH_ALL_USERS} from './actionTypes';

export const FETCH_ALL_USERS_ACTION_CONFIG = {
    name: FETCH_ALL_USERS,
    options: {
        async: true,
    },
};

export const ADD_USER_ACTION_CONFIG = {
    name: ADD_USER,
    options: {
        async: true,
    },
};

export default combineReducers({
    eGen: createReducers(FETCH_ALL_USERS_ACTION_CONFIG, { initialState: {} }),
    addUser: createReducers(ADD_USER_ACTION_CONFIG, { initialState: {} }),
});
