import React, { Component } from 'react'
import propType from 'prop-types';
import ReactIcon from '../Images/react.png';
import {Link} from 'react-router-dom';

//MUI Imports
import withStyles from '@material-ui/core/styles/withStyles';
import Grid  from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux import
import {connect} from 'react-redux';
import {loginUser} from '../Redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
    }

    componentWillReceiveProps(prevState, nextState) {
        const general = prevState.UI.errors;
        this.setState({...this.state, errors: {general}})
    }

    handleChange = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.value})
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history)
    }
    render() {
        const {classes, UI: {loading}} = this.props;
        return (
            <Grid container className = {classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <div className = "image-wrapper">
                    <img src = {ReactIcon} alt = "react" align = "center" height = {80} className = {classes.image}/>
                    </div>
                    <Typography variant = "h2" className = {classes.pageTitle}  align = "center">
                        Login
                    </Typography>
                    <form noValidate onSubmit = {(e) => this.handleSubmit(e)}>
                        <TextField
                        id = "email"
                        name = "email"
                        type = "email"
                        label = "Email"
                        className = {classes.textField}
                        value = {this.state.email}
                        helperText = {this.state.errors.email}
                        error = {this.state.errors.email ? true: false}
                        onChange = {(e) => this.handleChange(e)}
                        fullWidth
                        >
                        </TextField>
                        <TextField
                        id = "password"
                        name = "password"
                        type = "password"
                        label = "Password"
                        className = {classes.textField}
                        value = {this.state.password}
                        helperText = {this.state.errors.password}
                        error = {this.state.errors.password ? true: false}
                        onChange = {(e) => this.handleChange(e)}
                        fullWidth
                        >
                        </TextField>
                        {this.state.errors.general && (
                            <Typography variant = "body2" className = {classes.customError}>
                                {this.state.errors.general}
                            </Typography>
                        )

                        }
                        <Button type = "submit" variant = "contained" 
                        color = "primary" className = {classes.button} align = "center"
                        >
                        Login
                        {loading && (
                            <CircularProgress size = {30} className = {classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <small>Dont have an account? <Link to = {"/signup"}>signup here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

login.propType = {
    classes: propType.object.isRequired,
    loginUser: propType.func.isRequired,
    user: propType.object.isRequired,
    UI: propType.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionsToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login))
