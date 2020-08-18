import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

//material imports
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Typography } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';
import  Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

//Redux import
import { connect } from 'react-redux';
import {likeScream, unLikeScream} from '../Redux/actions/dataActions';

const styles = (theme) =>({
    card: {
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200
    },
    content: {
        padding: 25
    },
    ...theme.spreadIt,
});

export class Scream extends Component {
    likedScream = () => {
        if (
          this.props.user.likes &&
          this.props.user.likes.find(
            (like) => like.screamId === this.props.scream.screamId
          )
        )
          return true;
        else return false;
      };
      likeScream = () => {
        this.props.likeScream(this.props.scream.screamId);
      };
      unlikeScream = () => {
        this.props.unLikeScream(this.props.scream.screamId);
      };
    render() {
        dayjs.extend(relativeTime)
        const {classes, scream: {body, createdAt, userImage, userHandle, screamId, likeCount, commentCount},
        user: { authenticated, credentials: {userHandle: handle, email, imageUrl} }
        } = this.props;
        const likeButton = !authenticated ? (
            <Tooltip title = "Like">
            <IconButton className = {classes.button} style = {{"margin": "0px"}} component = {Link}  to = {'/login'}>
            <FavoriteBorder color = "primary" style = {{"margin": "0px"}}></FavoriteBorder>
            </IconButton>
            </Tooltip>
        ) : (
            this.likedScream() ? (
                <Tooltip title = "undoLike">
                <IconButton className = {classes.button} style = {{"margin": "0px"}} onClick = {this.unlikeScream} >
                <Favorite color = "primary" style = {{"margin": "0px"}}></Favorite>
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title = "Like">
                <IconButton className = {classes.button} style = {{"margin": "0px"}} onClick = {this.likeScream} >
                <FavoriteBorder color = "primary" style = {{"margin": "0px"}}></FavoriteBorder>
                </IconButton>
                </Tooltip>
            )
        );
        const deleteButton = authenticated && handle === userHandle ? (
            <DeleteScream screamId = {screamId} />
        ) : null
        return (
            <Card className = {classes.card} style = {{"display": "flex", "marginBottom": "20px"}}>
                <CardMedia 
                image = {userImage}
                title = "profile image"
                className = {classes.image}
                style = {{"minWidth": "200px", "margin": "0px"}}
                />
                <CardContent className = {classes.details}>
                    <Typography
                    variant = "h5"
                    component = {Link}
                    to = {`/users/${email}`}
                    color = "primary"
                    > 
                    {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant = "body2" color = "textSecondary"> 
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant = "body1"> {body}</Typography>
                    {likeButton}    
                    <span>{likeCount} Likes</span>
                    <Tooltip title = "Comments">
                    <IconButton className = {classes.button} style = {{"margin": "0px"}}>
                    <ChatIcon color = "primary" style = {{"margin": "0px"}}/>
                    </IconButton>
                    </Tooltip>
                    <span>{commentCount} Comments</span>
                    <ScreamDialog screamId = {screamId} userHandle = {userHandle}/>
                </CardContent>
            </Card>
        )
    }
}

const mapStateToProps = state =>({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unLikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream))
