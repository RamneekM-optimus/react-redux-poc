import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

// MUI import
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import AddIcons from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TextField } from '@material-ui/core';

// Reduc Import
import { connect } from 'react-redux';
import { postScream } from '../Redux/actions/dataActions';
import {clearErrors} from '../Redux/actions/dataActions';

const styles = (theme) => ({
    ...theme.spreadIt
});

export class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(prevState, nextState) {
        const general = prevState.UI.errors;
        this.setState({...this.state, errors: {general}}, () => {
            console.log(this.state.errors)
        })
        if(!prevState.UI.errors && !prevState.UI.loading) {
            this.setState({body: '', open: false, errors: {}})
        }
    }
    
    handleOpen = () => {
        this.setState({...this.state, open: true});
    }
    handleClose = () => {
        this.props.clearErrors();
        this.setState({...this.state, open: false, errors: {}});
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
    }

    addScream = (e, userHandle) => {
        this.props.postScream({body: this.state.body, userHandle}, this.handleClose);
    }

    handleInputChange = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    render() {
        const {classes, UI: {loading, errors}, user: {credentials: {userHandle}}} = this.props;
        return (
            <Fragment>
            <Tooltip title = "Post a scream !!!">
            <IconButton onClick = {this.handleOpen}>
            <AddIcons color = "primary"/>
            </IconButton>
            </Tooltip>
            <Dialog open = {this.state.open} 
                onClose = {() => this.handleClose()}
                fullWidth
                maxWidth = "sm">
                    <DialogTitle>Post a Scream</DialogTitle>
                    <DialogContent>
                        <form>
                        <TextField
                            name = "body"
                            type = "text"
                            label = "Scream your head out"
                            multiline
                            row = "3"
                            placeholder = "Scream your head out"
                            className = {classes.textField}
                            value = {this.state.bio}
                            onChange = {e => this.handleInputChange(e)}
                            fullWidth
                            helperText = {this.state.errors.general && this.state.errors.general["body"]}
                            error = {this.state.errors.general && this.state.errors.general["body"] ? true: false}
                            onChange = {this.handleInputChange}
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick = {(e) => this.addScream(e, userHandle)} color="secondary">
                            Save
                            {loading && (
                            <CircularProgress size = {30} className = {classes.progress}/>
                            )}
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    UI: state.UI,
    user: state.user
})

export default connect(mapStateToProps, { postScream, clearErrors })(withStyles(styles)(PostScream))
