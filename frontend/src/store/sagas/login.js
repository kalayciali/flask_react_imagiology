import { 
    take, 
    fork, 
    cancel, 
    call, 
    put, 
    cancelled 
} from 'redux-saga/effects'
import {push} from 'connected-react-router';

import setAxiosAuthToken from "../../utils/setAxiosAuthToken.js";
import * as loginActions from '../actions/login';
import * as api from '../api/auth';
import { fetchEntity } from './index';
import {REQUEST, FAILURE} from '../actions/index';

function* loginFlow(userData) {
    try {
        const payload = yield call(api.getToken, userData)
        const {token} = payload;

        // put token to header
        setAxiosAuthToken(token)
        localStorage.setItem('token', token)

        // put token to global state
        yield put(loginActions.loginActions.success(token))
        yield put(push('/main'))

    } catch(error) {
        localStorage.removeItem('token')
        yield put(loginActions.loginActions.failure(error))

    } finally {
        // to prevent multiple clicks if i remember correctly
        if (yield cancelled()) {
            localStorage.removeItem('token')
            yield put(push('/login'))
        }
    }
}

function* logoutFlow() {
    localStorage.removeItem('token')
    // delete token from headers
    setAxiosAuthToken()
    yield put(loginActions.logout())
    yield put(push('/'))
}

function* loginWatcher() {

    while(true) {
        const loginAction = yield take(loginActions.LOGIN[REQUEST])
        const {userData} = loginAction.payload
        const task = yield fork(loginFlow, userData)
        // waiting for logout action or failure
        const action = yield take([loginActions.LOGIN[FAILURE], loginActions.LOGOUT])
        if (action.type == loginActions.LOGIN[FAILURE])
            yield cancel(task)
        yield call(logoutFlow)
    }
}

export default loginWatcher

