import { 
    take, 
    fork, 
    cancel} 
from 'redux-saga/effects'
import {push} from 'connected-react-router';

import * as signupActions from '../actions/signup';
import * as api from '../api/auth.js';
import {REQUEST} from '../actions/index';


function* signupFlow(userData) {
    try {
        const token = yield call(api.createUser, userData)
        const {tokenStr} = token;

        setAxiosAuthToken(tokenStr)
        localStorage.setItem('token', tokenStr)

        yield put(signupActions.signupActions.success(tokenStr))
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

        const {userData} = action
        lastTask = yield fork(signupFlow, userData);
    }
}

export default signupWatcher
