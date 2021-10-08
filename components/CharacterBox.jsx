import React from 'react'
import { withStyles } from '@mui/styles'

import { Grid } from '@mui/material'

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: '3px',
        padding: '10px'
    }
})

function CharacterBox({
    classes,
    character,
    ...rest
}) {
    return (
        <Grid item xs={12} md={4} className={classes.root} {...rest}>
            {character.name}
        </Grid>
    )
}

export default withStyles(styles)(CharacterBox);