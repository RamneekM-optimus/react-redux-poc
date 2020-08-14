import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ThemeFile from './Util/Theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './Util/AuthRoute';

//Redux
import {Provider} from 'react-redux';
import store from './Redux/store';
import { SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './Redux/types';
import {logoutUser, getUserData} from './Redux/actions/userActions';

// Pages Folder
import home from "./Pages/home";
import login from "./Pages/login";
import signUp from "./Pages/signUp";
import User from './Pages/user';

// Components Folder
import NavBar from "./Components/NavBar";

// Material ui imports
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

//axios import 
import axios from 'axios';
// import LogRocket from 'logrocket';
// LogRocket.init('kb0wzp/socialapp');

const theme = createMuiTheme(ThemeFile);
const token = localStorage.AuthToken;
let authenticated;

if (token) {
  const decodedToken = jwtDecode(token);
  if(decodedToken.exp *1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    const bearerToken = `Bearer ${token}`;
    axios.defaults.headers.common['authorization'] = bearerToken;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme = {theme}>
      <Provider store = {store}>
      <Router>
      <NavBar/>
      <div className = "container">
      <Switch>
        <Route exact path = "/" component = {home}/>
        <AuthRoute exact path = "/login" component = {login} />
        <AuthRoute exact path = "/signup" component = {signUp} />
        <AuthRoute exact path = "/users/:handle" component = {User}/>
      </Switch>
      </div>
      </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
