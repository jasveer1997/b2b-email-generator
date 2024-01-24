import { all, call, put, takeLatest } from 'redux-saga/effects';
import createActions from '../../helper/actions';

import {ADD_USER, FETCH_ALL_USERS} from './actionTypes';
import {ADD_USER_ACTION_CONFIG, FETCH_ALL_USERS_ACTION_CONFIG} from './reducer';
import UsersService from './api';

function* fetchAllUsers({ payload = {} }) {
    const { SUCCESS, FAIL } = yield call(createActions, FETCH_ALL_USERS_ACTION_CONFIG);
    try {
        const usersResponse = yield call(UsersService.fetchUsers, payload);
        yield put(SUCCESS({ users: usersResponse }));
    } catch (error) {
        yield put(FAIL(error, { globalError: true }));
    }
}

function* addUser({ payload = {} }) {
    const { SUCCESS, FAIL } = yield call(createActions, ADD_USER_ACTION_CONFIG);
    try {
        const usersResponse = yield call(UsersService.addUser, payload);
        yield put(SUCCESS({ users: usersResponse }));
    } catch (error) {
        yield put(FAIL(error, { globalError: true }));
    }
}

function* handleFetchUsers() {
    yield takeLatest(FETCH_ALL_USERS, fetchAllUsers);
}

function* handleAddUser() {
    yield takeLatest(ADD_USER, addUser);
}

export default function* () {
    yield all([handleFetchUsers(), handleAddUser()]);
}
