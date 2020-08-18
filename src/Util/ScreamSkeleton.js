import React, { Component, Fragment } from 'react';
import NoImg from '../Images/no-img.png';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import withStyles from '@material-ui/core/styles/withStyles';

const styles = (theme) => ({
    ...theme,
    card: {
        display: "flex",
        marginBottom: 20,
    },
    cardContent: {
        width: "100%",
        flexDirection: 'column',
        padding: 25
    },
    cover: {
        minWidth: "200px",
        objectFit: 'cover'
    },
    handle: {
        width: 60,
        height: 18,
        backGroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backGroundColor: 'rgba(0,0,0,0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: "90%",
        backGroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: "50%",
        backGroundColor: 'rgba(0,0,0,0.6)',
        marginBottom: 10
    }
});

export class ScreamSkeleton extends Component {
    render() {
        const {classes} = this.props;
        let content = Array.from({length: 5}).map((item, index) => (
            <Card className = {classes.card} key = {index}>
                <CardMedia className = {classes.cover} image = {NoImg}/>
                <CardContent className = {classes.cardContent}>
                    <div className = {classes.handle}/>
                    <div className = {classes.date}/>
                    <div className = {classes.fullLine}/>
                    <div className = {classes.fullLine}/>
                    <div className = {classes.halfLine}/>
                </CardContent>
            </Card>
        ))
        return (
            <Fragment>
                {content}
            </Fragment>
        )
    }
}

export default withStyles(styles)(ScreamSkeleton);
