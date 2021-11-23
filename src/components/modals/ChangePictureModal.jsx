import React, { useEffect, useState } from 'react';
import { withStyles } from '@mui/styles';
import {
    TextField, Dialog, DialogActions, DialogContent,
    DialogTitle, Button, Grid, Link
} from '@mui/material'

import { api } from '../../utils';

const styles = theme => ({

})

function ChangePictureModal({
    classes,
    handleClose,

    character,
    onPictureChange
}) {
    const [pictureURLs, setPictureURLs] = useState({
        standard_character_picture_url: '',
        injured_character_picture_url: ''
    });

    useEffect(() => {
        setPictureURLs({
            standard_character_picture_url: character.standard_character_picture_url,
            injured_character_picture_url: character.injured_character_picture_url
        });
    }, [character]);

    function validateImageURL(url) {

        return ;



        if(!pictureURLs.standard_character_picture_url.includes('discord') || !pictureURLs.standard_character_picture_url.includes('imgur')) {
            return window.alert('Preencha as duas artes com URLs válidas!');
        }

        if(!pictureURLs.injured_character_picture_url.includes('discord') || !pictureURLs.injured_character_picture_url.includes('imgur')) {
            
        }
    }

    const submit = () => {
        if(!pictureURLs.injured_character_picture_url || !pictureURLs.standard_character_picture_url) {
            return window.alert('Preencha as duas artes!');
        }

        const allowedWebsites = ['discord', 'imgur'];

        if(!allowedWebsites.some(website => pictureURLs.injured_character_picture_url.includes(website))) {
            return window.alert('Preencha as duas artes com URLs válidas!');
        }

        if(!allowedWebsites.some(website => pictureURLs.standard_character_picture_url.includes(website))) {
            return window.alert('Preencha as duas artes com URLs válidas!');
        }

        if(!pictureURLs.injured_character_picture_url.endsWith('.png') && !pictureURLs.standard_character_picture_url.endsWith('.png')) {
            return window.alert('As artes precisam estar em formato PNG.');
        }

        api.put(`/character/${character.id}`, {
            injured_character_picture_url: pictureURLs.injured_character_picture_url,
            standard_character_picture_url: pictureURLs.standard_character_picture_url
        })
            .then(() => {
                // Callback
                onPictureChange();

                // Close modal
                handleClose();
            })
            .catch(() => {
                return window.alert('Erro ao salvar!');
            });
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>Alterar imagens do personagem</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <p>
                            As artes dos personagens devem estar <strong>obrigatoriamente</strong> no tamanho <strong>420x600</strong> e em formato <strong>PNG</strong>.
                        </p>

                        <p>
                            Apenas são aceitos links de imagens upadas no site <Link href="https://imgur.com/" target="_blank">Imgur</Link> ou no Discord.
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Imagem padrão"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={pictureURLs.standard_character_picture_url}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setPictureURLs(prevState => ({
                                        ...prevState,
                                        standard_character_picture_url: value
                                    }));
                                }
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{
                                marginTop: '15px'
                            }}
                            autoFocus
                            label="Imagem machucada"
                            type="text"
                            fullWidth
                            variant="standard"
                            value={pictureURLs.injured_character_picture_url}
                            onChange={
                                ({ target }) => {
                                    const value = target.value;

                                    setPictureURLs(prevState => ({
                                        ...prevState,
                                        injured_character_picture_url: value
                                    }));
                                }
                            }
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
                    Alterar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(ChangePictureModal);