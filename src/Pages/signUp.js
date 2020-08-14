import React, { Component } from 'react'
import propType from 'prop-types';
import ReactIcon from '../Images/react.png';
import {signUpWithCredential} from '../Services/LoginService';
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
import {signUpUser} from '../Redux/actions/userActions';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class signUp extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            handle: '',
            errors: {}
        }
    }

    handleChange = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.value})
    }

    componentWillReceiveProps(prevState, nextState) {
        const general =  prevState.UI.errors;
        if(prevState.UI.errors !== null)
        this.setState({...this.state, errors: {general : prevState.UI.errors.general}}, () => {
            console.log(this.state.errors.general);
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newUserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle,
        }
        if(this.state.confirmPassword === this.state.password) {
            this.setState({errors : null})
            this.props.signUpUser(newUserData, this.props.history);
        }
        else {
            const general = "PLease match password and confirm password";
            this.setState({errors :{general}})
        }
    }
    render() {
        const {classes, UI: {loading}} = this.props;
        // console.log(this.props)
        return (
            <Grid container className = {classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <img src = {ReactIcon} alt = "react" height = {80} className = {classes.image}/>
                    <Typography variant = "h2" className = {classes.pageTitle}>
                        Signup
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
                        <TextField
                        id = "confirmPassword"
                        name = "confirmPassword"
                        type = "password"
                        label = "Confirm Password"
                        className = {classes.textField}
                        value = {this.state.confirmPassword}
                        helperText = {this.state.errors.confirmPassword}
                        error = {this.state.errors.confirmPassword ? true: false}
                        onChange = {(e) => this.handleChange(e)}
                        fullWidth
                        >
                        </TextField>
                        <TextField
                        id = "handle"
                        name = "handle"
                        type = "text"
                        label = "User Name"
                        className = {classes.textField}
                        value = {this.state.handle}
                        helperText = {this.state.errors.confirmPassword}
                        error = {this.state.errors.confirmPassword ? true: false}
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
                        color = "primary" className = {classes.button} 
                        disabled = {loading}
                        >
                        Signup
                        {loading && (
                            <CircularProgress size = {30} className = {classes.progress}/>
                        )}
                        </Button>
                        <br/>
                        <small>Already have an account? <Link to = {"/login"}>login here</Link></small>
                    </form>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
        )
    }
}

signUp.propType = {
    classes: propType.object.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, {signUpUser})(withStyles(styles)(signUp))
