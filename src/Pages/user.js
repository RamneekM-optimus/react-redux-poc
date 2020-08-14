import React, { Component } from 'react';

import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import {getUserAction} from '../Redux/actions/dataActions';
import {getClickedUserDetails} from '../Services/LoginService';
import { Scream } from '../Components/Scream';
import StaticProfile from '../Components/StaticProfile';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class User extends Component {
    state = {
        profile: null
    }
    componentDidMount() {
        const handle = this.props.match.params.handle;
        this.props.getUserAction(handle);
        getClickedUserDetails(handle)
        .then(res => {
            this.setState({profile: res.data.user})
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const {screams, loading} = this.props.data;
        const ScreenMarkup = screams === [] ? (
            <p>loading ...</p>
        ) : (
            screams.map((scream, id) => <Scream key = {id} 
                scream = {scream} 
                user = {this.props.user} 
                classes = {this.props.classes}>
                </Scream>)
        )
        return (
            <Grid container spacing = {8}>
                <Grid item sm = {8} xs = {12}>
                    {ScreenMarkup}
                </Grid>
                <Grid item sm = {4} xs = {12}>
                    {this.state.profile === null ? (
                        <p>Loading ...</p>
                    ) : ( <StaticProfile profile = {this.state.profile}/> )}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data,
    user: state.user
})

export default connect(mapStateToProps, {getUserAction})(withStyles(styles)(User));
