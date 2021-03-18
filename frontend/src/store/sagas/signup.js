import { 
    take, 
    fork, 
    cancel,
    put,
    call,
} 
from 'redux-saga/effects'
import {push} from 'connected-react-router';
import setAxiosAuthToken from "../../utils/setAxiosAuthToken.js";

import * as signupActions from '../actions/signup';
import * as api from '../api/auth.js';
import {REQUEST} from '../actions/index';


function* signupFlow(userData) {
    try {
        const payload = yield call(api.createUser, userData)
        const {token} = payload;

        setAxiosAuthToken(token)
        localStorage.setItem('token', token)

        yield put(signupActions.signupActions.success(token))
        yield put(push('/main'))

    } catch(error) {

        setAxiosAuthToken()
        localStorage.removeItem('token')
        yield put(signupActions.signupActions.failure(error))
    }
}

function* signupWatcher() {
    let lastTask
    while (true) {
        const action = yield take(signupActions.SIGNUP[REQUEST])
        if (lastTask) {
            // to make secure multiple clicks
            yield cancel(lastTask)
        }

        const {userData} = action.payload
        lastTask = yield fork(signupFlow, userData);
    }
}

export default signupWatcher
