import {createAction, createRequestTypes} from './index';
import {REQUEST, SUCCESS, FAILURE} from './index';

export const SIGNUP = createRequestTypes('SIGNUP');

export const signupActions = {
    request: (userData) => createAction(SIGNUP[REQUEST], {userData}),
    success: (token) => createAction(SIGNUP[SUCCESS], {token}),
    failure: (response) => createAction(SIGNUP[FAILURE], {response}),
};
