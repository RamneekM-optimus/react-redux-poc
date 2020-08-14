import React, { Component, Fragment } from 'react'
import {Link} from 'react-router-dom';

// Mui Imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

//redux imports
import {connect} from 'react-redux';

//Mui Icons Import
import AddIcons from '@material-ui/icons/Add';
import HomeIcon from '@material-ui/icons/Home';
import NotificationIcon from '@material-ui/icons/Notifications';
import PostScream from './PostScream';


export class NavBar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className = "nav-container">
                    {
                        authenticated ? (
                        <Fragment>
                        <PostScream/>
                        <Tooltip title = "Home">
                        <Link to = {'/'}>
                        <IconButton >
                            <HomeIcon color = "primary"/>
                        </IconButton>
                        </Link>
                        </Tooltip>
                        <Tooltip title = "Notifications">
                        <IconButton >
                            <NotificationIcon color = "primary"/>
                        </IconButton>
                        </Tooltip>
                        </Fragment>
                        ) : (
                            <Fragment>
                            <Button color = "inherit" component = {Link} to = {"/"} >Home</Button>
                            <Button color = "inherit" component = {Link} to = {"/login"} >Login</Button>
                            <Button color = "inherit" component = {Link} to = {"signup"} >Signup</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(NavBar)
