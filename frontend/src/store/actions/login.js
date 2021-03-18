import {createAction, createRequestTypes} from './index';
import {REQUEST, SUCCESS, FAILURE} from './index';

export const LOGOUT = "LOGOUT_USER"

export const LOGIN = createRequestTypes('LOGIN')

export const loginActions = {
    request: (userData) => createAction(LOGIN[REQUEST], {userData}),
    success: (token) => createAction(LOGIN[SUCCESS], {token}),
    failure: (response) => createAction(LOGIN[FAILURE], {response}),
}

export function logout() {
    return {
        type: LOGOUT,
    };
}
