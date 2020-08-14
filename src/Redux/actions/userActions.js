import { SET_USER, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED } from '../types';
import {loginWithCredential, getUserDataFromApi, 
        signUpWithCredential, imageUpload,editUserDetailsFromApi} 
from '../../Services/LoginService';
import axios from 'axios';

export const loginUser = (userData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    loginWithCredential(userData)
    .then(response => {
        setAuthorizationToken(response.data.token)
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        history.push('/');
    })
    .catch(err => {
        const general = err.response.data.error;
        dispatch({type: SET_ERRORS, payload: general})
    })
}

export const signUpUser = (newUserData, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    signUpWithCredential(newUserData)
    .then(response => {
        setAuthorizationToken(response.data.token)
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
        history.push('/');
    })
    .catch(err => {
        const general = err.response.data;
        dispatch({type: SET_ERRORS, payload: general})
    })
}

const setAuthorizationToken = (token) => {
    localStorage.setItem('AuthToken', token)
    const bearerToken = `Bearer ${token}`;
    axios.defaults.headers.common['authorization'] = bearerToken;
}

export const logoutUser = () => (dispatch) =>{
    localStorage.removeItem('AuthToken');
    delete axios.defaults.headers.common['authorization'];
    dispatch({type: SET_UNAUTHENTICATED})
}

export const getUserData = () => (dispatch) => {
    getUserDataFromApi()
    .then(response => {
        dispatch({
            type: SET_USER,
            payload: response.data
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const upLoadImage = (formData) => (dispatch) => {
    dispatch({type: LOADING_UI});
    imageUpload(formData)
    .then(response => {
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
    })
    .catch(err => {
        console.log(err.response);
    })
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_UI});
    editUserDetailsFromApi(userDetails)
    .then(response => {
        dispatch(getUserData())
        dispatch({type: CLEAR_ERRORS})
    })
    .catch(err => {
        console.log(err.response);
    })
}