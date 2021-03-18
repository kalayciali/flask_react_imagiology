import {
    apiPost,
    apiGet,
} from './index';

const BASE_URL = "/api/auth"

export function validateToken(token) {
    return apiPost(BASE_URL + '/is_token_valid', token)
}

export function getToken(userData) {
    return apiPost(BASE_URL + '/get_token', userData)
}

export function getUserInfo(token) {
    return apiGet(BASE_URL + '/user', token)
}

export function createUser(userData) {
    return apiPost(BASE_URL + '/create_user', userData)
}


