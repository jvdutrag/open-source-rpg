import React from 'react'
import { withStyles } from '@mui/styles'

import { Grid, TextField } from '@mui/material'

import useModal from '../hooks/useModal';

import { InfoModal } from '../components';

const styles = theme => ({
    name: {
        display: 'flex',
        alignItems: 'center'
    },

    textName: {
        cursor: 'pointer'
    }
});

const SheetEditableRow = ({
    classes,
    data,
    onValueChange,
    onInput
}) => {
    const infoModal = useModal(({ close }) => (
        <InfoModal
            title={data.name}
            text={data.description}
            handleClose={close}
        />
    ));

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item md={8} xs={12} className={classes.name}>
                    <span className={classes.textName} onClick={() => infoModal.appear()}>
                        {data.name}
                    </span>
                </Grid>
                <Grid item md={4} xs={12}>
                    <TextField
                        value={data.value}
                        variant="outlined"
                        fullWidth
                        inputProps={{
                            style: {
                                padding: 8
                            }
                        }}
                        onBlur={event => onValueChange(event.target.value)}
                        onChange={event => onInput(event.target.value)}
                    />
                </Grid>
            </Grid>
        </div>
    )
}

export default withStyles(styles)(SheetEditableRow);