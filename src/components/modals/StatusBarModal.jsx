import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, Grid,
    DialogTitle, Button
} from '@mui/material'

const styles = theme => ({

})

function StatusBarModal({
    classes,
    handleClose,

    onSubmit,
    data,
    type
}) {
    const [newData, setNewData] = useState({
        current: 0,
        max: 0
    });

    useEffect(() => {
        if(!newData) {
            return;
        }

        setNewData({
            current: data.current,
            max: data.max
        });
    }, [data]);
    
    const resetState = () => {
        return setNewData({
            current: 0,
            max: 0
        });
    }

    const submit = () => {
        if(!newData.current || !newData.max) {
            return;
        }

        onSubmit(newData).then(() => resetState());
    }

    const getTitle = () => {
        switch (type) {
            case 'hp': return 'Alterar pontos de vida';
            case 'san': return 'Alterar pontos de sanidade';
            case 'ocult': return 'Alterar pontos de ocultismo';
            default: return 'Alterar pontos';
        }
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>
                {getTitle()}
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Atual"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={newData.current}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setNewData(prevState => ({
                                        ...prevState,
                                        current: value
                                    }));
                                }
                            }
                            spellCheck={false}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Máximo"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={newData.max}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setNewData(prevState => ({
                                        ...prevState,
                                        max: value
                                    }));
                                }
                            }
                            spellCheck={false}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={submit}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(StatusBarModal);