import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent, DialogContentText,
    DialogTitle, Button
} from '@mui/material'

import { api } from '../../utils';

const styles = theme => ({

})

function CreateCharacterModal({
    classes,
    handleClose,
    onCharacterCreated
}) {
    const [character, setCharacter] = useState({
        name: ''
    });
    
    const resetState = () => {
        return setCharacter({
            name: ''
        });
    }

    const createCharacter = () => {
        if(!character.name) {
            return;
        }

        api.post('/character', character)
            .then(() => {
                // Callback
                onCharacterCreated();

                // Close modal
                handleClose();

                resetState();
            })
            .catch(() => {
                alert('Erro ao criar o personagem!');
            });
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>Criar novo personagem</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Insira as informações do persoangem que deseja criar.
                </DialogContentText>
                <TextField
                    style={{
                        marginTop: '15px'
                    }}
                    autoFocus
                    label="Nome"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={character.name}
                    onChange={
                        ({ target }) => {
                            const value = target.value;

                            setCharacter(prevState => ({
                                ...prevState,
                                name: value
                            }));
                        }
                    }
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    color="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    onClick={createCharacter}
                >
                    Criar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(CreateCharacterModal);