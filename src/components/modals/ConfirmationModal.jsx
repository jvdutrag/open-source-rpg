import React from 'react';
import { withStyles } from '@mui/styles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button
} from '@mui/material';

const styles = theme => ({

})

function ConfirmationModal({
    classes,
    handleClose,
    title,
    text,
    data,
    onConfirmation
}) {
    return (
        <Dialog
            open={true}
            onClose={handleClose}
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
                    color="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={() => {
                        onConfirmation(data);

                        handleClose();
                    }}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(ConfirmationModal);