import axios from 'axios';

const baseRef = "https://us-central1-social-app-c083b.cloudfunctions.net/api";

export function loginWithCredential(userData) {
    return axios.post(`${baseRef}/login`, userData)
}

export function signUpWithCredential(NewUserData) {
    return axios.post(`${baseRef}/signup`, NewUserData)
}

export function getUserDataFromApi() {
    return axios.get(`${baseRef}/user`)
}

export function imageUpload(data) {
    return axios.post(`${baseRef}/user/imageupload`, data)
}

export function editUserDetailsFromApi(data) {
    return axios.post(`${baseRef}/user`, data)
}

export function getClickedUserDetails(data) {
    return axios.get(`${baseRef}/user/${data}`)
}