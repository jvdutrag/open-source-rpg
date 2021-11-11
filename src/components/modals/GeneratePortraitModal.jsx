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

    const copyURLToClipboard = url => {
        return copyToClipboard(url);
    }

    return (
        <Dialog
            open={true}
            onClose={handleClose}
        >
            <DialogTitle>
                Gerar link de portrait para o OBS
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <span>
                            Escolha o que deve ser mostrado no portrait:
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
                            label="Link para o portrait"
                            type="text"
                            Icon={CopyIcon}
                            fullWidth
                            value={getPortraitURL()}
                            disabled
                            onClickIcon={() => copyURLToClipboard(getPortraitURL())}
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