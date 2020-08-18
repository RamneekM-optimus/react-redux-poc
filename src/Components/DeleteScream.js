import React, { Component, Fragment } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

// MUI import
import  Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

// Reduc Import
import { connect } from 'react-redux';
import { deleteScream } from '../Redux/actions/dataActions';

const styles = {
}

export class DeleteScream extends Component {
    state = {
        open: false
    };
    handleOpen = () => {
        this.setState({...this.state, open: true});
    }
    handleClose = () => {
        this.setState({...this.state, open: false});
    }

    deleteScream = () => {
        this.props.deleteScream(this.props.screamId)
        this.setState({...this.state, open: false});
    }
    render() {
        const {classes} = this.props;
        return (
            <Fragment>
            <Tooltip title = "Delete">
            <IconButton onClick = {this.handleOpen} className = {classes.deleteButton}>
            <DeleteOutline color = "secondary"></DeleteOutline>
            </IconButton>
            </Tooltip>
            <Dialog open = {this.state.open} 
                onClose = {() => this.handleClose()}
                fullWidth
                maxWidth = "sm">
                    <DialogTitle>Are you sure you want to delete this scream ?</DialogTitle>
                    {/* <DialogContent>
                    </DialogContent> */}
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.deleteScream()} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Fragment>
        )
    }
}

export default connect(null, {deleteScream})(withStyles(styles)(DeleteScream));
