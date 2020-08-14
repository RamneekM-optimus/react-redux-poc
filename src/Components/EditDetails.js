import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import { editUserDetails } from '../Redux/actions/userActions';

// Redux Imports
import {connect} from 'react-redux';

// MUI Imports
import  Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';


const styles = (theme) => ({
    ...theme.spreadIt,
    button: {
        float: 'right'
    }
});

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        location: '',
        open: false
    }

    componentWillReceiveProps(props) {
        const { credentials } = props;
        this.setState({
            bio: credentials.bio || '',
            website: credentials.website || '',
            location: credentials.location || '',
        })
    }

    handleOpen = () => {
        this.setState({...this.state,open: true});
    }

    handleClose = () => {
        this.setState({...this.state,open: false});
    }

    handleInputChange = (event) => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    handleSubmit = (event) => {
        const {bio, website, location} = this.state;
        const userDetails = {
            bio, website, location
        }
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <Tooltip title = "Edit Details">
                    <IconButton className = {classes.button} onClick = {() =>this.handleOpen()}>
                    <EditIcon color = "primary"/>
                    </IconButton>
                </Tooltip>
                <Dialog open = {this.state.open} 
                onClose = {() => this.handleClose()}
                fullWidth
                maxWidth = "sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                            name = "bio"
                            type = "text"
                            label = "Bio"
                            multiline
                            row = "3"
                            placeholder = "A short introduction"
                            className = {classes.textField}
                            value = {this.state.bio}
                            onChange = {e => this.handleInputChange(e)}
                            fullWidth 
                            />
                            <TextField
                            name = "website"
                            type = "text"
                            label = "Website"
                            placeholder = "your website"
                            className = {classes.textField}
                            value = {this.state.website}
                            onChange = {e => this.handleInputChange(e)}
                            fullWidth
                            />
                            <TextField
                            name = "location"
                            type = "text"
                            label = "Location"
                            placeholder = "Where do you live ?"
                            className = {classes.textField}
                            value = {this.state.location}
                            onChange = {e => this.handleInputChange(e)}
                            fullWidth
                            />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleSubmit()} color="primary">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
});

export default connect(mapStateToProps, {editUserDetails})(withStyles(styles)(EditDetails));
