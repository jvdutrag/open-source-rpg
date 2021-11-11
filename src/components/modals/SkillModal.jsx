import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, Grid,
    DialogTitle, Button
} from '@mui/material'

import { api } from '../../utils';

const styles = theme => ({

})

function SkillModal({
    classes,
    handleClose,

    onSubmit,
    data,
    operation
}) {
    const [skill, setSkill] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if(!data) {
            return;
        }

        setSkill({
            name: data.name,
            description: data.description
        });
    }, [data]);
    
    const resetState = () => {
        return setSkill({
            name: '',
            description: ''
        });
    }

    const submit = () => {
        if(!skill.name) {
            return;
        }

        if(operation === 'create') {
            api.post('/skill', skill)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(() => {
                    alert('Erro ao criar a perícia!');
                });
        }
        else if (operation === 'edit') {
            api.put(`/skill/${data.id}`, skill)
                .then(() => {
                    // Callback
                    onSubmit();

                    // Close modal
                    handleClose();

                    resetState();
                })
                .catch(() => {
                    alert('Erro ao editar a perícia!');
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
                    operation === 'create' ? 'Criar nova perícia' : 'Editar perícia'
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
                            value={skill.name}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setSkill(prevState => ({
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
                            value={skill.description}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setSkill(prevState => ({
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

export default withStyles(styles)(SkillModal);