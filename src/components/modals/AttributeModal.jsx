import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, Grid,
    DialogTitle, Button
} from '@mui/material'

import { api } from '../../utils';

const styles = theme => ({

})

function AttributeModal({
    classes,
    handleClose,

    onSubmit,
    data,
    operation
}) {
    const [attribute, setAttribute] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if(!data) {
            return;
        }

        setAttribute({
            name: data.name,
            description: data.description
        });
    }, [data]);
    
    const resetState = () => {
        return setAttribute({
            name: '',
            description: ''
        });
    }

    const submit = () => {
        if(!attribute.name) {
            return;
        }

        if(operation === 'create') {
            api.post('/attribute', attribute)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(() => {
                    alert('Erro ao criar o atributo!');
                });
        }
        else if (operation === 'edit') {
            api.put(`/attribute/${data.id}`, attribute)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(err => {
                    alert('Erro ao editar o atributo!');
                });
        }
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>
                {
                    operation === 'create' ? 'Criar novo atributo' : 'Editar atributo'
                }
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Nome"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={attribute.name}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setAttribute(prevState => ({
                                        ...prevState,
                                        name: value
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
                            label="Descrição"
                            type="text"
                            fullWidth
                            multiline
                            variant="standard"
                            value={attribute.description}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setAttribute(prevState => ({
                                        ...prevState,
                                        description: value
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

export default withStyles(styles)(AttributeModal);