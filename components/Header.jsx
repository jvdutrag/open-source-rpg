import React from 'react'
import { withStyles } from '@mui/styles'

import { Grid } from '@mui/material'

function Header({
    title,
    classes
}) {
    return (
        <Grid
            item
            xs={12}
            justifyContent="center"
            style={{ textAlign: 'center' }}
        >
            <img 
                style={{ 
                    width: '200px'
                }}
                src="/assets/logo.png"
                alt="Open Source RPG"
            />
            <h1
                className={classes.title}
            >
                {title}
            </h1>
        </Grid>
    )
}

const styles = theme => ({
    title: {
        color: '#c2c2c2',
        margin: 0,
        textTransform: 'uppercase'
    }
});

export default withStyles(styles)(Header);
