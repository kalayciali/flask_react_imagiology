import jwtDecode from 'jwt-decode';
import {
    LOGIN,
    LOGOUT,
} from '../actions/login.js'
import { SIGNUP } from '../actions/signup.js'
import * as signupActions from '../actions/signup.js'
import {REQUEST, SUCCESS, FAILURE} from '../actions/index';

const initialState = {
    token: null,
    email: null,
    isAuthenticating: false,
    isAuthenticated: false,
    statusText: null,
    isRegistering: false,
    isRegistered: false,
    registerStatusText: null,
};

const MESSAGES = {
    [LOGIN[SUCCESS]]: "You have been successfully logged in",
    [LOGIN[FAILURE]]: "Auth error: ",
    [LOGOUT]: "You have been successfully logged out",
    [SIGNUP[SUCCESS]]: "You have been successfully logged in",
    [SIGNUP[FAILURE]]: "Register error: ",
}

const reducer = function loginReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN[REQUEST]:
            return Object.assign({}, state, {
                isAuthenticating: true,
                statusText: null,
            })

        case LOGIN[SUCCESS]:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: true,
                token: payload.token,
                email: jwtDecode(payload.token).email,
                statusText: MESSAGES[LOGIN[SUCCESS]],
            })

        case LOGIN[FAILURE]:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                token: null,
                email: null,
                statusText: MESSAGES[LOGIN[FAILURE]] + action.payload.status,
            })

        case LOGOUT:
            return Object.assign({}, state, {
                isAuthenticated: false,
                token: null,
                email: null,
                statusText: MESSAGES[LOGOUT],
            })


        case SIGNUP[REQUEST]:
            return Object.assign({}, state, {
                isRegistering: true,
            })

        case SIGNUP[SUCCESS]:
            return Object.assign({}, state, {
                isAuthenticating: false,
                isAuthenticated: false,
                isRegistering: false,
                token: action.payload.token,
                email: jwtDecode(action.payload.token).email,
                registerStatusText: MESSAGES[SIGNUP[SUCCESS]],
            })

        case SIGNUP[FAILURE]:
            return Object.assign({}, state, {
                isAuthenticated: false,
                isRegistering: false,
                token: null,
                email: null,
                registerStatusText: MESSAGES[SIGNUP[FAILURE]] + action.payload.status,
            })
    }
}

export default reducer

export const getAuthInfo = (state) => state.auth
