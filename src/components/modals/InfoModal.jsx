import React from 'react';
import { withStyles } from '@mui/styles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button
} from '@mui/material';

const styles = theme => ({

})

function InfoModal({
    classes,
    handleClose,
    title,
    text
}) {
    return (
        <Dialog
            open={true}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="sm"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(InfoModal);