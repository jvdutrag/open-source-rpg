import React, { useState } from 'react';
import { withStyles } from '@mui/styles';
import {
    Dialog, DialogActions, DialogContent, Grid,
    DialogTitle, Button, FormGroup, FormControlLabel, Checkbox
} from '@mui/material'

import {
    ContentCopy as CopyIcon
} from '@mui/icons-material';

import copyToClipboard from 'copy-to-clipboard';

import TextFieldIcon from '../TextFieldIcon';

const styles = theme => ({

})

function GeneratePortraitModal({
    classes,
    handleClose,

    characterId
}) {
    const [showOptions, setShowOptions] = useState({
        name: true,
        stats: true,
        picture: true
    });

    const getPortraitURL = () => {
        const baseURL = window.location.href.replace('/dashboard', '');

        let url = `${baseURL}/portrait/${characterId}?show=`;

        if(showOptions.name) {
            url += 'name,';
        }

        if(showOptions.stats) {
            url += 'stats,';
        }

        if(showOptions.picture) {
            url += 'picture';
        }
        
        return url;	
    }

    const getDiceURL = () => {
        const baseURL = window.location.href.replace('/dashboard', '');

        let url = `${baseURL}/dice/${characterId}`;

        return url;	
    }

    const copyURLToClipboard = url => {
        return copyToClipboard(url);
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>
                Integração para o OBS
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span>
                            Link para o portrait (escolha o que deve ser mostrado):
                        </span>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox defaultChecked onChange={e => setShowOptions(prevState => ({ ...prevState, name: e.target.checked }))} />} label="Nome" />
                            <FormControlLabel control={<Checkbox defaultChecked onChange={e => setShowOptions(prevState => ({ ...prevState, stats: e.target.checked }))} />} label="Stats" />
                            <FormControlLabel control={<Checkbox defaultChecked onChange={e => setShowOptions(prevState => ({ ...prevState, picture: e.target.checked }))} />} label="Imagem" />
                        </FormGroup>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldIcon
                            variant="outlined"
                            label="Link para o OBS"
                            type="text"
                            Icon={CopyIcon}
                            fullWidth
                            value={getPortraitURL()}
                            disabled
                            onClickIcon={() => copyURLToClipboard(getPortraitURL())}
                        />
                    </Grid>
                </Grid>
                <hr style={{ marginTop: '25px', marginBottom: '25px' }} />
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span>
                            Link para os dados em tela:
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextFieldIcon
                            variant="outlined"
                            label="Link para o OBS"
                            type="text"
                            Icon={CopyIcon}
                            fullWidth
                            value={getDiceURL()}
                            disabled
                            onClickIcon={() => copyURLToClipboard(getDiceURL())}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default withStyles(styles)(GeneratePortraitModal);