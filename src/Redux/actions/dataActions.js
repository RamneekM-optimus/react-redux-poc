import {SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, 
    DELETE_SCREAM, POST_SCREAM, LOADING_UI, CLEAR_ERRORS, SET_ERRORS, SET_SCREAM} from '../types';
import { likeScreamFromApi, getScreamsFromApi, postScreamFromApi, getScreamById,
    unLikeScreamFromApi, deleteScreamFromApi } from '../../Services/dataService';

import {getClickedUserDetails} from '../../Services/LoginService';

export const getScreams = () => (dispatch) => {
    getScreamsFromApi()
    .then(response => {
        dispatch({
            type: SET_SCREAMS,
            payload: response.data.data
        })
    })
    .catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })  
    })
}

export const likeScream = (screamId) => (dispatch) => {
    likeScreamFromApi(screamId)
    .then(response => {
        dispatch({type: LIKE_SCREAM, payload: response.data})
    })
    .catch(err => {
        console.log(err);
    })
}

export const unLikeScream = (screamId) => (dispatch) => {
    unLikeScreamFromApi(screamId)
    .then(response => {
        dispatch({type: UNLIKE_SCREAM, payload: response.data})
    })
    .catch(err => {
        console.log(err);
    })
}

export const deleteScream = (screamId) => (dispatch) => {
    deleteScreamFromApi(screamId)
    .then(response => {
        dispatch({type: DELETE_SCREAM, payload: screamId});
    })
    .catch(err => {
        console.log(err)
    })
}

export const getScream = (screamId) => (dispatch) => {
    getScreamById(screamId)
    .then(response => {
        dispatch({type: SET_SCREAM, payload: response.data})
    })
    .catch(error => {
        console.log(error);
    })
}

export const postScream = (newScream, callback) => (dispatch) => {
    dispatch({type: LOADING_UI});
    postScreamFromApi(newScream)
    .then(response => {
        dispatch({type: POST_SCREAM, payload: response.data});
        dispatch({type: CLEAR_ERRORS})
        callback();
    })
    .catch(err => {
        const general = err.response.data;
        dispatch({type: SET_ERRORS, payload: general})
    })
}

export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}

export const getUserAction = (userHandle) => dispatch => {

    getClickedUserDetails(userHandle)
    .then(res => {
        console.log("actions", res.data.screams);
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        })
    })
}

