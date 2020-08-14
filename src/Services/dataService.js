import axios from 'axios';


const baseRef = "https://us-central1-social-app-c083b.cloudfunctions.net/api";

export function getScreamsFromApi() {
    return axios.get(`${baseRef}/screams`)
}

export function likeScreamFromApi(screamId) {
    return axios.get(`${baseRef}/screams/${screamId}/likes`)
}

export function unLikeScreamFromApi(screamId) {
    return axios.get(`${baseRef}/screams/${screamId}/unlikes`)
}

export function deleteScreamFromApi(screamId) {
    return axios.delete(`${baseRef}/screams/${screamId}`)
}

export function postScreamFromApi(newScream) {
    return axios.post(`${baseRef}/screams`, newScream)
}

export function getScreamById(screamId) {
    return axios.get(`${baseRef}/screams/${screamId}`)
}

