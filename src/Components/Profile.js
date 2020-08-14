import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
//MUI imports
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'

//Reduc imports
import {connect} from 'react-redux';
import {upLoadImage, logoutUser} from '../Redux/actions/userActions';

//Icons imports
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class Profile extends Component {

    handleFileInput = (e) => {
        const image = e.target.files[0];
        const formData = new FormData();
        if (image) {
            formData.append('image', image, image.name);
            this.props.upLoadImage(formData);
        }
    }

    handleImageChange = (e) => {
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    }

    handleLogout = (e) => {
        this.props.logoutUser();
    }


    render() {
        const {classes, user: {credentials: {userHandle, createdAt, imageUrl, bio, website, location}, authenticated}} = this.props;
        let profileMarkUp = authenticated?(
            <Paper className = {classes.paper}>
                <div className = {classes.profile}>
                    <div className = "image-wrapper">
                        <img src = {imageUrl} alt = "profile" className = "profile-image"
                        width = {100}
                        height = {100}/>
                        <input type = "file" id = "fileInput" hidden = "hidden"
                        accept="image/x-png,image/gif,image/jpeg"
                        onChange = {(e) => this.handleFileInput(e)}/>
                        <IconButton onClick = {e => this.handleImageChange(e)}>
                            <EditIcon color = "primary"/>
                        </IconButton>
                    </div>
                    <hr/>
                    <div className = "profile-details">
                        <MuiLink component = {Link} to = {`/users/${userHandle}`} 
                            color = "primary" variant = "h5">
                                @{userHandle}
                        </MuiLink>
                        <hr/>
                    {bio && <Typography variant = "body2">{bio}</Typography>}
                    <hr/>
                    {location && (
                        <Fragment>
                            <LocationOn color = 'primary'/>
                            <span>{location}</span>
                        </Fragment>
                    )}
                    {website && (
                        <Fragment>
                            <LinkIcon color = 'primary'/>
                            <a href = {website} target = "_blank">
                                {''}{website}
                            </a>
                            <hr/>
                        </Fragment>
                    )}
                    <CalendarTodayIcon coloe = "primary"/>
                    <span>Joined {dayjs(createdAt).format('MMM YYYY')}</span>
                    </div>
                    <Tooltip title = "logout">
                    <IconButton onClick = {e => this.handleLogout(e)}>
                        <KeyboardReturn color = "primary"/>
                    </IconButton>
                    </Tooltip>
                    <EditDetails/>
                </div>
            </Paper>
        ) : (
            <Paper className = {classes.paper}>
                <Typography variant = "body2" align = "center">
                    No Profile Found, please login again {authenticated}
                </Typography>
                <div className = {classes.buttons}>
                    <Button variant = "contained" 
                    color = "primary" component = {Link} to = {"/login"}>
                        Login
                    </Button>
                    <Button variant = "contained" 
                    color = "secondary" component = {Link} to = {"/signup"}>
                        Signup
                    </Button>
                </div>
            </Paper>
        )
        return profileMarkUp
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
});

const mapActionsToProps = {
    logoutUser,
    upLoadImage
}

export default  connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));
