import React, { Component } from 'react'
import Grid  from '@material-ui/core/Grid';
import axios from 'axios';
import Scream from '../Components/Scream';
import Profile  from '../Components/Profile';
import {connect} from 'react-redux';
import {getScreams} from '../Redux/actions/dataActions';

export class home extends Component {

    componentDidMount() {
        this.props.getScreams()
    }
    render() {
        const {screams} = this.props.data;
        let recentScreenMarkup = screams ? (
            screams.map((scream, key) => <Scream key = {key} scream = {scream}>{scream.body}</Scream>)
        ) : (
            <p>Loading....</p>
        );
        return (
            <Grid container spacing = {8}>
                <Grid item sm = {8} xs = {12}>
                    {recentScreenMarkup}
                </Grid>
                <Grid item sm = {4} xs = {12}>
                    <Profile/>
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = state => ({
    data: state.data
})

export default connect(mapStateToProps, {getScreams})(home);
