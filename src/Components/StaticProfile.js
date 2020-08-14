import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';

import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOn from '@material-ui/icons/LocationOn';
import MuiLink from '@material-ui/core/Link';
import EditIcon from '@material-ui/icons/Edit';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';
import EditDetails from './EditDetails';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class StaticProfile extends Component {
    render() {
        const {classes, profile: {userHandle, createdAt, imageUrl, bio, website, location}} = this.props;

        return (
            <Paper className = {classes.paper}>
                <div className = {classes.profile}>
                    <div className = "image-wrapper">
                        <img src = {imageUrl} alt = "profile" className = "profile-image"
                        width = {100}
                        height = {100}/>
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
                </div>
            </Paper>
        )
    }
}

export default withStyles(styles)(StaticProfile);
